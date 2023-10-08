import { LoadingType } from '../../models';

type User = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  status: boolean | null;
  avatar: string | null;
};

type InitialState = {
  loading: LoadingType;
  isEditLoaded: LoadingType;
  data: User;
};

type GetUserTitle = Pick<User, 'id'>;

type EditUserTitle = {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
};

export type { User, InitialState, GetUserTitle, EditUserTitle };
