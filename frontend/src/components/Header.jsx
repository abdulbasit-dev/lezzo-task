import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {HomeOutlined, ShopOutlined} from '@ant-design/icons';
import {Menu} from 'antd';

function Header() {

  return (
    <Menu
      // onClick={handleClick}
      // selectedKeys={[current]}
      mode='horizontal'
      className='header'
    >
      <Link to='/'>
        <Menu.Item icon={<HomeOutlined />}>Home</Menu.Item>
      </Link>

      <Link to='/stores_table'>
        <Menu.Item icon={<ShopOutlined />}>All Stores</Menu.Item>
      </Link>
    </Menu>
  );
}

export default Header;
