import * as React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '../scss/main.scss';
import { App } from './components/App';
import { i18n } from './config/i18n';
import { createLogger } from './config/logger';
import { configureStore } from './config/store';

// Fontawesome setup
import fontawesome from '@fortawesome/fontawesome';
import fontawesomeSolid from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(fontawesomeSolid);

const log = createLogger("index");
const store = configureStore();

// Render main app component
ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById("root"),
  () => log.info("App is ready!")
);
