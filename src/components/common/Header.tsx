import React, { useState } from 'react';

import logo from '../../assets/images/logo.png';


import { Icon, Image, Item, Menu } from 'semantic-ui-react';

const Header: React.FC = () => {

    const [ activeItem, setActiveItem] = useState('recent');

    return (
          <div className='header-menu'>
            <Menu secondary>
              <Image src={logo} className='logo' spaced/>
              <Menu.Item
                name='recent'
                active={activeItem === 'recent'}
                onClick={(e) => setActiveItem('recent')}
              >
                Recent Articles
              </Menu.Item>

              <Menu.Item
                name='about'
                active={activeItem === 'about'}
                onClick={(e) => setActiveItem('about')}
              >
                About
              </Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item>
                  <Item as='a' >Login</Item>
                  <Icon name='arrow right' spaced/>
                </Menu.Item>
                
              </Menu.Menu>
            </Menu>
          </div>
    );
}

export default Header