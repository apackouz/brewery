import React, { useEffect, useRef, useCallback } from "react";
import "./modal.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  closeOnOutsideClick = false,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeModal = useCallback(() => {
    onClose();
    dialogRef.current?.close();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (closeOnOutsideClick && event.target === dialog) {
        closeModal();
      }
    };

    if (closeOnOutsideClick) {
      dialog?.addEventListener("click", handleOutsideClick);
    }

    return () => {
      if (dialog) {
        dialog.close();
      }
      if (closeOnOutsideClick) {
        dialog?.removeEventListener("click", handleOutsideClick);
      }
    };
  }, [closeOnOutsideClick, closeModal]);

  return (
    <dialog ref={dialogRef} className="dialog">
      <button onClick={closeModal} className="closeButton">
        ×
      </button>
      {children}
    </dialog>
  );
};

export default Modal;
