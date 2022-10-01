
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { Icon, Item, Menu } from 'semantic-ui-react';
import { AppDispatch, authenticate, logout } from '../../redux';

const AuthMenu: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAppSelector(state => state.auth);

  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { 
    setActiveItem(e.currentTarget.id ) 
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch])

  return (
      auth.isAuthenticated ? (
        <Menu.Item>
            <Item 
              id='myArticles' 
              as={Link} 
              active={activeItem === 'myArticles'}
              onClick={handleItemClick}
              to={`/articles/user/${auth.user.id}`} >My Articles</Item>
            <Item 
              id='addArticle' 
              as={Link} 
              active={activeItem === 'addArticle'}
              onClick={handleItemClick}
              to='/articles/add' >Create Article</Item>
            <Item 
              id='logout' 
              as={Link} 
              onClick={handleLogout} 
              to='/' >Logout</Item>
        </Menu.Item>
      ) : (
            <Menu.Item>
            <Item 
              id='login'
              as={Link}
              active={activeItem === 'login'}
              onClick={handleItemClick}
              to='/login' >Log In</Item>
            <Icon name='arrow right'/>
          </Menu.Item>
      )
  );
};

export default AuthMenu;