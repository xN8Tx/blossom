import { RefObject, forwardRef, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import selectMessageByMessageId from '@chat/store/selectors/selectMessageByMessageId';
import { deleteMessage } from '@chat/store/chatThunk';

import MenuContext from '@chat/context/MenuContext';
import isMessageImage from '@chat/utils/isMessageImage';

import MenuItem from '@chat/components/menu-item/MenuItem';

import ForwardIcon from '@chat/assets/ForwardIcon';
import CopyIcon from '@chat/assets/CopyIcon';
import EditIcon from '@chat/assets/EditIcon';
import DeleteIcon from '@chat/assets/DeleteIcon';

import type { Messages } from '@/models/data';

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

  const userId = useAppSelector((state) => state.user.data.id); // USER ID
  const message = useAppSelector((state) =>
    selectMessageByMessageId(state, Number(selectedMessageId), Number(id))
  ); // MESSAGE FROM STATE
  const isMessageFromUser =
    message && Number(message.userId) === Number(userId);
  const isImage = message && isMessageImage((message as Messages)!.message);

  // CHANGE POSITION IF MENU GO OUT OF BOUNDS
  useEffect(() => {
    if (!ref) return () => {};

    const containerWidth = (ref as RefObject<HTMLDivElement>).current!
      .clientWidth;
    const containerHeight = (ref as RefObject<HTMLDivElement>).current!
      .clientHeight;

    if (containerWidth - posX < 150) {
      setPosX(containerWidth - 300);
    }

    if (containerHeight - posY < 185) {
      setPosY(containerHeight - 185);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posX, posY]);

  // LAST MESSAGE ID MADE FRO DELETE ALLOCATION OF PREV MESSAGE
  const lastMessageId = useRef<string>('');

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
  // CHANGE COLOR MESSAGE FN

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => changeColorOfSelectedMessage(), [selectedMessageId]);

  // ITEMS HANDLERS
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
  const forwardMessageHandler = () => {};

  // ARRAY OF ITEMS
  const menuItemsList: MenuItemProps[] = [
    {
      name: 'forward',
      icon: () => <ForwardIcon />,
      onClick: forwardMessageHandler,
      color: 'primary',
    },
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
        if (isMessageFromUser && !isImage) {
          return (
            <MenuItem
              key={index}
              name={item.name}
              icon={item.icon}
              onClick={item.onClick}
              color={item.color}
            />
          );
        } else {
          if (index === 2) return <></>;
          return (
            <MenuItem
              key={index}
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
