import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import Icon from '@ant-design/icons';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">With Military</a>
      </div>
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>
    </nav>
  )
}

export default NavBar