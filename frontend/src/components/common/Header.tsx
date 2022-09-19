import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Image, Menu } from 'semantic-ui-react';
import AuthMenu from '../auth/AuthMenu';

const Header: FC = () => {

    const [activeItem, setActiveItem] = useState('recent');

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { 
      setActiveItem(e.currentTarget.id ) 
    }

    return (
      <div className='header-menu'>
        <Menu secondary>
          <Image src={logo} className='logo' spaced/>
          
          <Menu.Item
              id='recent'
              active={activeItem === 'recent'}
              onClick={handleItemClick}
              as={Link}
              to='/'
            >
              Recent Articles
              </Menu.Item>
        
            <Menu.Item
              id='about'
              active={activeItem === 'about'}
              onClick={handleItemClick}
              as={Link}
              to='/about'
            >
              About
            </Menu.Item>
          <Menu.Menu position='right'>
            <AuthMenu></AuthMenu>
          </Menu.Menu>
        </Menu>
      </div>
    );  
  }

export default Header