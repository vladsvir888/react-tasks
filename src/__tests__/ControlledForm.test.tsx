import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ControlledForm from '../components/ControlledForm';
import { Provider } from 'react-redux';
import store from '../store';

describe('ControlledForm', () => {
  const mockSetIsVisible = vi.fn();

  const renderForm = () =>
    render(
      <Provider store={store}>
        <ControlledForm setIsVisible={mockSetIsVisible} />
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
});
