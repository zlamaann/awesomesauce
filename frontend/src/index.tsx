import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/index.scss';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { retrieveAllArticles, retrieveAllComments, retrieveAllVotes } from './redux';

//import 'semantic-ui-css/semantic.min.css';


store.dispatch(retrieveAllArticles());
store.dispatch(retrieveAllComments());
store.dispatch(retrieveAllVotes());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

