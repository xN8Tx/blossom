import { Suspense } from 'react';

import Router from '../routes/Router';
import Modal from '../modules/modal/Modal';

function App() {
  return (
    <Suspense fallback='Loading...'>
      <Modal />
      <Router />
    </Suspense>
  );
}

export default App;
