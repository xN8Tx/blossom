type ModalStateType = 'error' | 'loading' | 'success' | 'idle';

type ModalContextType = {
  modalState: ModalStateType;
  setModalState: React.Dispatch<React.SetStateAction<ModalStateType>>;
  modalText: string;
  setModalText: React.Dispatch<React.SetStateAction<string>>;
};

export type { ModalStateType, ModalContextType };
