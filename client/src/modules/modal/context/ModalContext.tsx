import { createContext } from 'react';
import type { ModalContextType } from '../models';

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export default ModalContext;
