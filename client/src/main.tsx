import { ModalProvider, ThemeProvider } from 'blossom-react-ui';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import './i18n';

import App from './app/App';

import store from './store';

import 'blossom-react-ui/dist/cjs/style.min.css';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
