import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useModal } from 'blossom-react-ui';

import { useAppDispatch, useAppSelector } from '@/store';
import { sendFile } from '@chat/store/thunk/chat-action/chatAction';

import SendIcon from '@chat/assets/SendIcon';
import ClipIcon from '@chat/assets/ClipIcon';

import type { ChangeEvent, MouseEvent } from 'react';

import style from './ButtonForm.module.scss';
import selectById from '@/modules/chat/store/selectors/selectById';
import LoadingIcon from '@/modules/chat/assets/LoadingIcon';

type ButtonFormProps = {
  sendMyMessage: () => void;
};

export default function ButtonForm({ sendMyMessage }: ButtonFormProps) {
  const { t } = useTranslation();
  const modal = useModal();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const isFileLoaded = useAppSelector(
    (state) => selectById(state, Number(id))?.isFileLoaded
  );

  const onFileButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const fileSize = file.size / Math.pow(10, 6);
    const isFileBigger = import.meta.env.VITE_MAX_FILE_SIZE < fileSize;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const base64File = reader.result!.toString();
      const fileType = file.type;
      const fileName = file.name;
      const fileExtension = file.name.split('.').pop();

      const title = {
        chatId: id!,
        file: {
          fileExtension: fileExtension!,
          file: base64File,
          fileType,
          fileName,
        },
      };

      dispatch(sendFile(title));
    });

    if (isFileBigger) modal('error', t('chat.fileBigger'), 2000);
    if (!isFileBigger) reader.readAsDataURL(file);
  };

  const onSendMessage = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    sendMyMessage();
  };

  return (
    <div className={style.buttons}>
      <div className={style.button}>
        {!isFileLoaded && (
          <>
            <input type='file' onChange={onFileButtonChange} />
            <ClipIcon />
          </>
        )}
        {isFileLoaded && <LoadingIcon />}
      </div>
      <button className={style.button} onClick={onSendMessage} type='submit'>
        <SendIcon />
      </button>
    </div>
  );
}
