import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import SearchBar from './Sections/SearchBar';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import Icon from '@ant-design/icons';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">With Military</a>
      </div>
		  <SearchBar />
      <div className="menu__container">
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar