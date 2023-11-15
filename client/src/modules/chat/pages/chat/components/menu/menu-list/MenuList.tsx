import { RefObject, forwardRef, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../../../store';
import { selectMessage } from '../../../../../store/chatSelector';
import { deleteMessage } from '../../../../../store/chatThunk';
import MenuContext from '../../../../../context/MenuContext';

import ForwardIcon from '../../../../../assets/ForwardIcon';
import CopyIcon from '../../../../../assets/CopyIcon';
import EditIcon from '../../../../../assets/EditIcon';
import DeleteIcon from '../../../../../assets/DeleteIcon';

import style from './MenuList.module.scss';
import MenuItem from '../../../../../components/menu-item/MenuItem';

type MenuItemProps = {
  name: string;
  icon: () => JSX.Element;
  onClick: (value?: unknown) => void;
  color: 'user' | 'red';
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
    selectMessage(state, Number(selectedMessageId), Number(id))
  ); // MESSAGE FROM STATE
  const isMessageFromUser =
    message && Number(message.userId) === Number(userId);

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
      color: 'user',
    },
    {
      name: 'copy',
      icon: () => <CopyIcon />,
      onClick: copyMessageHandler,
      color: 'user',
    },
    {
      name: 'edit',
      icon: () => <EditIcon />,
      onClick: editMessageHandler,
      color: 'user',
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
        if (isMessageFromUser) {
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
