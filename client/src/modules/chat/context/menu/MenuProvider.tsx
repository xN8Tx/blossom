import { useState } from 'react';
import MenuContext, { MenuContextType } from './MenuContext';

type MenuProviderProps = {
  children: React.ReactNode;
};

export default function MenuProvider({ children }: MenuProviderProps) {
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const [editMessageId, setEditMessageId] = useState<string>('');

  const value: MenuContextType = {
    posX,
    setPosX,
    posY,
    setPosY,
    isOpen,
    setIsOpen,
    selectedMessageId,
    setSelectedMessageId,
    editMessageId,
    setEditMessageId,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
