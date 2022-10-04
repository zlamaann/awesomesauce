
import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { Icon, Menu } from 'semantic-ui-react';
import { AppDispatch, logout } from '../../redux';
import { toast } from 'react-toastify';

const AuthMenu: FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isAuthenticated, user, error } = useAppSelector(state => state.auth);

  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { 
    setActiveItem(e.currentTarget.id ) 
  }

  const handleLogout = () => {
    dispatch(logout()).unwrap()
      .then((result) => {
        toast.success("User successfully logged out");
        navigate(`/articles/user/${result.id}`);
  })
  };

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  return (
      isAuthenticated ? (
        <>
        <Menu.Item
          id='myArticles' 
          as={Link} 
          active={activeItem === 'myArticles'}
          onClick={handleItemClick}
          to={`/articles/user/${user.id}`}
        >
          My Articles
        </Menu.Item>
        <Menu.Item 
          id='addArticle' 
          as={Link} 
          active={activeItem === 'addArticle'}
          onClick={handleItemClick}
          to='/articles/add' 
        >
          Create Article
        </Menu.Item>
        <Menu.Item 
          id='logout' 
          as={Link} 
          onClick={handleLogout} 
          to='/' 
        >
          Logout
        </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item 
            id='login'
            as={Link}
            active={activeItem === 'login'}
            onClick={handleItemClick}
            to='/login' 
          >
            Log In
          <Icon name='arrow right'/>
          </Menu.Item>
          
        </>
      )
  );
};

export default AuthMenu;