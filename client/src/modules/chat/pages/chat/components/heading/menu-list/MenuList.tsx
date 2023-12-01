import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '@/store';
import { deleteChat } from '@chat/store/chatThunk';

import MenuItem from '@chat/components/menu-item/MenuItem';

import SearchIcon from '@/assets/svg/SearchIcon';
import DeleteIcon from '@chat/assets/DeleteIcon';

import style from './MenuList.module.scss';

export default function MenuList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const searchIcon = () => <SearchIcon />;
  const deleteIcon = () => <DeleteIcon />;

  const onDeleteClick = () => {
    dispatch(deleteChat(id!));
    navigate('/');
  };

  return (
    <div className={style.list}>
      <MenuItem
        color='user'
        name='search'
        icon={searchIcon}
        onClick={() => {}}
      />
      <MenuItem
        color='red'
        name='delete'
        icon={deleteIcon}
        onClick={onDeleteClick}
      />
    </div>
  );
}
