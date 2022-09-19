
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/hooks';
import { logout } from '../../redux';
import { Icon, Item, Menu } from 'semantic-ui-react';

const AuthMenu: FC = () => {
  const dispatch = useDispatch();
  const auth = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
      auth.isAuthenticated ? (
        <Menu.Item>
            <Item id='myArticles' as={Link} to='/articles/user/:id' >My Articles</Item>
            <Item id='add' as={Link} to='/articles/add' >Create Article</Item>
            <Item id='logout' as={Link} to='/logout' >Logout</Item>
        </Menu.Item>
      ) : (
          !auth.loading ? (
            <Menu.Item>
            <Item 
              id='login'
              as={Link}
              to='/login' >Log In</Item>
            <Icon name='arrow right' spaced/>
          </Menu.Item>
          ) : null
      )
  );
};

export default AuthMenu;