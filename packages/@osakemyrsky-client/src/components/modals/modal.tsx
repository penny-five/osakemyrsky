import classNames from "classnames";
import React, { FunctionComponent, useRef } from "react";
import { createPortal } from "react-dom";

import Button, { ButtonPriority, ButtonVariant } from "@/atoms/button";
import Heading from "@/atoms/heading";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export interface ModalProps {
  title?: string;
  buttons: React.ReactNode;
  closeOnClickOutside?: boolean;
  onClose: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ children, title, buttons, closeOnClickOutside, onClose }) => {
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    if (closeOnClickOutside) {
      onClose();
    }
  });

  return createPortal(
    <div
      className={classNames({
        "flex items-center justify-center absolute top-0 left-0 w-screen h-screen": true,
        "bg-black-100 bg-opacity-60 z-50": true
      })}
    >
      <div ref={modalRef} className="min-w-[400px] p-6 bg-white rounded-xl shadow-lg">
        {title != null && <Heading level={3}>{title}</Heading>}
        <div className="my-8">{children}</div>
        <div className="flex justify-end gap-4">
          {" "}
          <Button variant={ButtonVariant.TEXT} priority={ButtonPriority.SECONDARY} onClick={onClose}>
            Peruuta
          </Button>
          {buttons}
        </div>
      </div>
    </div>,
    document.body
  );
};

Modal.defaultProps = {
  closeOnClickOutside: true
};

export default Modal;
