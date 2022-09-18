import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Icon, Image, Item, Menu } from 'semantic-ui-react';

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
            <Menu.Item>
              <Item 
                id='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to='/login' >Log In</Item>
              <Icon name='arrow right' spaced/>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
      </div>
    );  
  }

export default Header