import { createContext } from 'react';

type EmojiContextType = {
  isEmojiOpen: boolean;
  setIsEmojiOpen: (value: boolean) => void;
};

const EmojiContext = createContext({} as EmojiContextType);

export default EmojiContext;
