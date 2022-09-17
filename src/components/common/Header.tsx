import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { Icon, Image, Item, Menu } from 'semantic-ui-react';

export default class Header extends Component {

  state = { activeItem: 'recent'};

  handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { 
    this.setState({ activeItem: e.currentTarget.id }) 
  }

  render() {

    const { activeItem } = this.state;

    return (
      <div className='header-menu'>
        <Menu secondary>
          <Image src={logo} className='logo' spaced/>
          
          <Menu.Item
              id='recent'
              active={activeItem === 'recent'}
              onClick={this.handleItemClick}
              as={Link}
              to='/'
            >
              Recent Articles
              </Menu.Item>
        
            <Menu.Item
              id='about'
              active={activeItem === 'about'}
              onClick={this.handleItemClick}
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
                onClick={this.handleItemClick}
                as={Link}
                to='/login' >Log In</Item>
              <Icon name='arrow right' spaced/>
            </Menu.Item>
            
          </Menu.Menu>
        </Menu>
      </div>
    );  
  }
}
