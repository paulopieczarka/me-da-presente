
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { i18n } from 'element-react';
import locale from 'element-react/src/locale/lang/en';

i18n.use(locale);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
