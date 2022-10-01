import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ArticlesList from '../article/ArticlesList'
import About from "../About";
import Login from "../auth/Login";
import ArticleForm from "../article/ArticleForm";
import ArticleDetail from "../article/ArticleDetail";
import { FC, useContext, useEffect } from 'react';
import Register from '../auth/Register';
import ArticlesListUser from '../article/ArticlesListUser';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { authenticate } from '../../redux';
import PrivateRoute from '../auth/PrivateRoute';
import { Loader } from 'semantic-ui-react';


const Main: FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => state.auth)

 /* useEffect(() => {
    dispatch(authenticate())
  }, [])*/

    return (
      <div>
      <Routes>
          <Route path='/' element={<ArticlesList />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/articles' element={<ArticlesList />} />
          <Route path='/articles/:id' element={<ArticleDetail />} />
          <Route element={<PrivateRoute />} >
            <Route path='/articles/add' element={ <ArticleForm />} />
            <Route path='/articles/add/:id' element={<ArticleForm />} />
            <Route path='/articles/user/:id' element={<ArticlesListUser />} />  
          </Route>      
      </Routes>
    </div>
    );
};

export default Main;