import React from 'react';
import { Layout } from './components/common/Layout';
import { BrowserRouter } from 'react-router-dom';


function App() {


  return (
      <BrowserRouter>
        <Layout></Layout>
      </BrowserRouter>
  );
}

export default App;
