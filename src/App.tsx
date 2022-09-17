import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from './components/common/Layout';
import { store } from './redux'
import { BrowserRouter } from 'react-router-dom';


function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout></Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
