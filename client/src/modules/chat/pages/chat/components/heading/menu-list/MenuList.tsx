import { useAppDispatch } from '../../../../../../../store';

import MenuItem from '../../../../../components/menu-item/MenuItem';

import SearchIcon from '../../../../../../../assets/svg/SearchIcon';
import DeleteIcon from '../../../../../assets/DeleteIcon';

import style from './MenuList.module.scss';
import { deleteChat } from '../../../../../store/chatThunk';
import { useNavigate, useParams } from 'react-router-dom';

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
