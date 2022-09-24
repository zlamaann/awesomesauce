import { Routes, Route, Navigate } from 'react-router-dom';
import ArticlesList from '../article/ArticlesList'
import About from "../About";
import Login from "../auth/Login";
import ArticleForm from "../article/ArticleForm";
import ArticleDetail from "../article/ArticleDetail";
import { FC, useContext } from 'react';
import Register from '../auth/Register';
import ArticlesListUser from '../article/ArticlesListUser';

const Main: FC = () => {

    return (
      <Routes>
          <Route path='/' element={<ArticlesList />} />
          <Route path='/articles' element={<ArticlesList />} />
          <Route path='/articles/add' element={<ArticleForm />} />
          <Route path='/articles/:id' element={<ArticleDetail />} />
          <Route path='/articles/user/:id' element={<ArticlesListUser />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
      </Routes>
    );
};

export default Main;