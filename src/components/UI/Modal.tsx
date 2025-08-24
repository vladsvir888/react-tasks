import { createPortal } from 'react-dom';
import IconClose from '../icons/IconClose';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, title, isVisible, setIsVisible }: Props) => {
  const close = () => setIsVisible(false);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, []);

  return (
    isVisible &&
    createPortal(
      <div
        className="modal fixed inset-0 z-10 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog_label"
      >
        <div
          className="modal-overlay absolute inset-0 bg-black/30"
          onClick={close}
        />
        <div className="modal-wrapper relative bg-white rounded w-[500px] max-w-[calc(100%-20px)] max-h-[calc(100%-20px)] overflow-y-auto">
          <div className="modal-header flex items-center justify-between p-2 sticky top-0 left-0 bg-white">
            <div id="dialog_label" className="modal-title font-bold text-xl">
              {title}
            </div>
            <button
              className="modal-close cursor-pointer"
              aria-label="Close"
              onClick={close}
            >
              <IconClose />
            </button>
          </div>
          <div className="modal-content p-2">{children}</div>
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
