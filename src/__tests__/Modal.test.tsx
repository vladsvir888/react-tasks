import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../components/UI/Modal';

describe('Modal', () => {
  const mockSetIsVisible = vi.fn();

  const renderModal = (isVisible: boolean) =>
    render(
      <Modal
        title="Test Modal"
        isVisible={isVisible}
        setIsVisible={mockSetIsVisible}
      >
        Modal Content
      </Modal>
    );

  it('should render modal when visible', () => {
    renderModal(true);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', () => {
    renderModal(true);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockSetIsVisible).toHaveBeenCalledWith(false);
  });

  it('should close modal when clicking outside modal', () => {
    renderModal(true);

    const overlay = screen
      .getByRole('dialog')
      .querySelector('.modal-overlay') as HTMLDivElement;
    fireEvent.click(overlay);

    expect(mockSetIsVisible).toHaveBeenCalledWith(false);
  });

  it('should close modal when pressing Escape key', () => {
    renderModal(true);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockSetIsVisible).toHaveBeenCalledWith(false);
  });
});
