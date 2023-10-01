import { Suspense, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store';

import Router from '../routes/Router';
import Modal from '../modules/modal/Modal';
import decodeJWT from '../utils/decodeJwt';
import { getUser } from '../store/user/userThunk';

function App() {
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAuth !== 'auth') return () => {};
    if (loading !== 'idle') return () => {};
    if (localStorage.getItem('accessToken') === undefined) return () => {};

    const token = localStorage.getItem('accessToken');
    const { id } = decodeJWT(token!);

    const title = {
      id: id,
    };

    dispatch(getUser(title));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <Suspense fallback='Loading...'>
      <Modal />
      <Router />
    </Suspense>
  );
}

export default App;
