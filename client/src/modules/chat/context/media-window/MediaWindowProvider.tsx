import { useEffect, useState } from 'react';

import MediaWindowContext from './MediaWindowContext';

import type { TypeStateType } from './MediaWindowContext';
import { useParams } from 'react-router-dom';

type MediaWindowProviderPropsType = {
  children: React.ReactNode;
};

export default function MediaWindowProvider({
  children,
}: MediaWindowProviderPropsType) {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<TypeStateType>(null);
  const [mediaUrl, setMediaUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [id]);

  return (
    <MediaWindowContext.Provider
      value={{
        isOpen,
        setIsOpen,
        type,
        setType,
        mediaUrl,
        setMediaUrl,
      }}
    >
      {children}
    </MediaWindowContext.Provider>
  );
}
