import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './i18n';

import store from './store';
import App from './app/App';

import './index.scss';
import ModalProvider from './modules/modal/context/ModalProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);
