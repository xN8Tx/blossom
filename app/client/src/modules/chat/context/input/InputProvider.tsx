import { useState } from 'react';
import InputContext from './InputContext';

type EmojiProvidePropsType = {
  children: React.ReactNode;
};

const InputProvider = ({ children }: EmojiProvidePropsType) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputProvider;
