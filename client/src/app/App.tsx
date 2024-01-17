import { Modal } from 'blossom-react-ui';
import { Suspense } from 'react';

import AppInit from './AppInit';
import Router from '@/routes/Router';

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
