import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UncontrolledForm from '../components/UncontrolledForm';
import { Provider } from 'react-redux';
import store from '../store';

describe('UncontrolledForm', () => {
  const mockSetIsVisible = vi.fn();

  const renderForm = () =>
    render(
      <Provider store={store}>
        <UncontrolledForm setIsVisible={mockSetIsVisible} />
      </Provider>
    );

  it('should render fields', () => {
    renderForm();

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('age')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('gender-1')).toBeInTheDocument();
    expect(screen.getByTestId('gender-2')).toBeInTheDocument();
    expect(screen.getByTestId('country')).toBeInTheDocument();
    expect(screen.getByTestId('picture')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('passwordConfirmation')).toBeInTheDocument();
    expect(screen.getByTestId('conditionsAgreement')).toBeInTheDocument();
  });

  it('should display validation errors for invalid fields', async () => {
    renderForm();

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/name is a required field/i)).toBeInTheDocument();
      expect(screen.getByText(/age is a required field/i)).toBeInTheDocument();
      expect(
        screen.getByText(/email is a required field/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/password is a required field/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/accept terms and conditions/i)
      ).toBeInTheDocument();
    });
  });

  it('should validate password strength and show progress bar', async () => {
    renderForm();

    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'qwerty' } });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, {
      target: { value: 'qwertyQ1&' },
    });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByRole('progressbar').getAttribute('value')).toBe('100');
    });
  });

  it('should display and clear error messages on invalid/valid input', async () => {
    renderForm();

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/name is a required field/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId('name'), {
      target: { value: 'Ivan Petrov' },
    });

    await waitFor(() => {
      expect(
        screen.queryByText(/name is required a field/i)
      ).not.toBeInTheDocument();
    });
  });

  it('should update picture name on file selection', async () => {
    renderForm();

    const fileInput = screen.getByTestId('picture');
    const file = new File(['test'], 'test-picture.png');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/test-picture.png/i)).toBeInTheDocument();
    });
  });
});
