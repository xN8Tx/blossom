import { Dispatch, SetStateAction, createContext } from 'react';

export type MenuContextType = {
  posX: number;
  setPosX: Dispatch<SetStateAction<number>>;
  posY: number;
  setPosY: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedMessageId: string;
  setSelectedMessageId: Dispatch<SetStateAction<string>>;
  editMessageId: string; // id of message that is being edited
  setEditMessageId: Dispatch<SetStateAction<string>>;
};

const MenuContext = createContext<MenuContextType>({
  posX: 0,
  setPosX: () => {},
  posY: 0,
  setPosY: () => {},
  isOpen: false,
  setIsOpen: () => {},
  selectedMessageId: '',
  setSelectedMessageId: () => {},
  editMessageId: '',
  setEditMessageId: () => {},
});

export default MenuContext;
