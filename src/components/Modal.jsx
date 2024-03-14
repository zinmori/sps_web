import { useRef, useEffect } from "react";

export default function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <dialog
      className="w-2/5 rounded-md p-4 backdrop:bg-opacity-50 backdrop:bg-black"
      ref={dialog}
      onClose={onClose}
    >
      {open ? children : null}
    </dialog>
  );
}
