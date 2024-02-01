import {
  Fragment,
  RefObject,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import selectMessageByMessageId from '@chat/store/selectors/selectMessageByMessageId';
import { deleteMessage } from '@chat/store/thunk/chat-action/chatAction';

import MenuContext from '@/modules/chat/context/menu/MenuContext';

import MenuItem from '@chat/components/menu-item/MenuItem';

import CopyIcon from '@chat/assets/CopyIcon';
import EditIcon from '@chat/assets/EditIcon';
import DeleteIcon from '@chat/assets/DeleteIcon';
import DownloadIcon from '@chat/assets/DownloadIcon';

import style from './MenuList.module.scss';

type MenuItemProps = {
  name: string;
  icon: () => JSX.Element;
  onClick: (value?: unknown) => void;
  color: 'primary' | 'red';
};

const MenuList = forwardRef<HTMLDivElement>((_, ref) => {
  const dispatch = useAppDispatch();
  // LIST SECTION
  const {
    isOpen,
    setIsOpen,
    posX,
    posY,
    setPosX,
    setPosY,
    selectedMessageId,
    setEditMessageId,
  } = useContext(MenuContext); // CONTEXT OF MENU

  const { id } = useParams(); // CHAT ID

  // LAST MESSAGE ID MADE FRO DELETE ALLOCATION OF PREV MESSAGE
  const lastMessageId = useRef<string>('');

  /*
    FROM STATE
  */
  const userId = useAppSelector((state) => state.user.data.id); // USER ID
  const message = useAppSelector((state) =>
    selectMessageByMessageId(state, Number(selectedMessageId), Number(id))
  ); // MESSAGE FROM STATE
  const isMessageFromUser =
    message && Number(message.userId) === Number(userId);
  const isImage = message?.type;

  // CHANGE COLOR MESSAGE FN
  const changeColorOfSelectedMessage = () => {
    if (selectedMessageId !== '') {
      const message = document.querySelector(
        `[data-id="${selectedMessageId}"]`
      );

      message?.setAttribute('is-active', 'true');
    }

    if (lastMessageId.current !== '') {
      const lastMessage = document.querySelector(
        `[data-id="${lastMessageId.current}"]`
      );

      lastMessage?.setAttribute('is-active', 'false');
    }

    lastMessageId.current = selectedMessageId;
  };

  /*
    USE EFFECTS
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeColorOfSelectedMessage(), [selectedMessageId]);

  // CHANGE POSITION IF MENU GO OUT OF BOUNDS
  useEffect(() => {
    if (!ref) return () => {};
    if (!isOpen) return () => {};

    const containerWidth = (ref as RefObject<HTMLDivElement>).current!
      .clientWidth;
    const containerHeight = (ref as RefObject<HTMLDivElement>).current!
      .clientHeight;

    if (document.body.clientWidth > 768) {
      if (containerWidth - posX < 150) {
        setPosX(containerWidth - 300);
      }
      if (containerHeight - posY < 185) {
        setPosY(containerHeight - 185);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posX, posY, isOpen]);

  /*
    ITEMS HANDLERS
  */
  const editMessageHandler = () => {
    setEditMessageId(selectedMessageId);
    setIsOpen(false);
    changeColorOfSelectedMessage();
  };
  const copyMessageHandler = async () => {
    try {
      const text = document.querySelector(
        `[data-id="${selectedMessageId}"]`
      )?.innerHTML;
      await navigator.clipboard.writeText(text!);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  const deleteMessageHandler = () => {
    const title = {
      chatId: id!,
      message: {
        id: selectedMessageId,
      },
    };

    dispatch(deleteMessage(title));

    setIsOpen(false);
    changeColorOfSelectedMessage();
  };
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = message!.message;
    link.download = 'blossom-file';
    link.click();
  };

  // ARRAY OF ITEMS
  const menuItemsList: MenuItemProps[] = [
    {
      name: 'copy',
      icon: () => <CopyIcon />,
      onClick: copyMessageHandler,
      color: 'primary',
    },
    {
      name: 'edit',
      icon: () => <EditIcon />,
      onClick: editMessageHandler,
      color: 'primary',
    },
    {
      name: 'download',
      icon: () => <DownloadIcon />,
      onClick: downloadFile,
      color: 'primary',
    },
    {
      name: 'delete',
      icon: () => <DeleteIcon />,
      onClick: deleteMessageHandler,
      color: 'red',
    },
  ];

  return (
    <div
      className={style.list}
      is-open={isOpen.toString()}
      style={{ left: posX, top: posY }}
    >
      {menuItemsList.map((item, index) => {
        if (isMessageFromUser && isImage) {
          if (index === 1) return <Fragment key={item.name} />;
          return (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              onClick={item.onClick}
              color={item.color}
            />
          );
        } else if (isMessageFromUser && !isImage) {
          if (index === 2) return <Fragment key={item.name} />;
          return (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              onClick={item.onClick}
              color={item.color}
            />
          );
        } else if (!isMessageFromUser && isImage) {
          if (index === 1) return <Fragment key={item.name} />;
          return (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              onClick={item.onClick}
              color={item.color}
            />
          );
        } else {
          if (index === 1) return <Fragment key={item.name} />;
          if (index === 2) return <Fragment key={item.name} />;
          return (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              onClick={item.onClick}
              color={item.color}
            />
          );
        }
      })}
    </div>
  );
});

export default MenuList;
