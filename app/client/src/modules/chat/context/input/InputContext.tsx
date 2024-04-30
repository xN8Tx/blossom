import { Dispatch, SetStateAction, createContext } from 'react';

type InputContextType = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

const InputContext = createContext({} as InputContextType);

export default InputContext;
