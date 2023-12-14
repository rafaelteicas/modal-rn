import React, {useState} from 'react';

import {createContext} from 'react';

type Modal = React.ReactNode;

interface ModalProps {
  modal: Modal | null;
  setModal: (modal: Modal) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalProps>({} as ModalProps);

export function ModalProvider({children}: React.PropsWithChildren) {
  const [visible, setVisible] = useState<Modal | null>(null);
  function setModal(modal: Modal) {
    setVisible(modal);
  }
  function hideModal() {
    setVisible(false);
  }
  return (
    <ModalContext.Provider value={{modal: visible, hideModal, setModal}}>
      {children}
    </ModalContext.Provider>
  );
}
