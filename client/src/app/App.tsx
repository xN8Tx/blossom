import { Suspense } from 'react';

import AppInit from './AppInit';

import Modal from '../modules/modal/Modal';
import Router from '../routes/Router';

function App() {
  return (
    <Suspense fallback='Loading...'>
      <AppInit />
      <Modal />
      <Router />
    </Suspense>
  );
}

export default App;
