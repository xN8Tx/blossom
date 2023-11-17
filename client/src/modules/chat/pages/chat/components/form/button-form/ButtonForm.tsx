import config from '../../../../../../../config';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../../../../store';

import { sendMessage } from '../../../../../store/chatThunk';
import useModal from '../../../../../../modal/hooks/useModal';

import type { ChangeEvent, MouseEvent } from 'react';

import SendIcon from '../../../../../assets/SendIcon';
import ClipIcon from '../../../../../assets/ClipIcon';

import style from '../Form.module.scss';

type ButtonFormProps = {
  onMyMessageSend: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function ButtonForm({ onMyMessageSend }: ButtonFormProps) {
  const { t } = useTranslation();
  const modal = useModal();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const onFileButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const fileSize = file.size / Math.pow(10, 6);
    const isFileBigger = config.maxFileSize < fileSize;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // if (reader.result === null) return null;
      const title = {
        chatId: id!,
        message: reader.result!.toString(),
      };

      dispatch(sendMessage(title));
    });

    if (isFileBigger) modal('error', t('chat.fileBigger'), 2000);
    if (!isFileBigger) reader.readAsDataURL(file);
  };

  return (
    <div className={style.buttons}>
      <div className={style.button}>
        <input type='file' onChange={onFileButtonChange} accept='image/*' />
        <ClipIcon />
      </div>
      <button className={style.button} onClick={onMyMessageSend} type='submit'>
        <SendIcon />
      </button>
    </div>
  );
}
