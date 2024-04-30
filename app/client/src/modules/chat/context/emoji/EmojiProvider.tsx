import { useState } from 'react';
import EmojiContext from './EmojiContext';

type EmojiProvidePropsType = {
  children: React.ReactNode;
};

const EmojiProvider = ({ children }: EmojiProvidePropsType) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  return (
    <EmojiContext.Provider value={{ isEmojiOpen, setIsEmojiOpen }}>
      {children}
    </EmojiContext.Provider>
  );
};

export default EmojiProvider;
