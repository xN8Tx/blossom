import { Dispatch, SetStateAction, createContext } from 'react';

type TypeStateType = 'image' | 'video' | null;

type MediaWindowContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  type: TypeStateType;
  setType: Dispatch<SetStateAction<TypeStateType>>;
  mediaUrl: string;
  setMediaUrl: Dispatch<SetStateAction<string>>;
};

const MediaWindowContext = createContext({} as MediaWindowContextType);

export type { MediaWindowContextType, TypeStateType };
export default MediaWindowContext;
