import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button, Layout as AntLayout, Menu } from 'antd';
import { message } from 'antd';

const { Header, Content } = AntLayout;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    message.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AntLayout className="min-h-screen">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
          {user && user.access_token ? (
            <>
              <Menu.Item key="2"><Link to="/profile">Profile</Link></Menu.Item>
              <Menu.Item key="3"><Button onClick={handleLogout}>Logout</Button></Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="4"><Link to="/login">Login</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/register">Register</Link></Menu.Item>
            </>
          )}
        </Menu>
      </Header>
      <Content className="p-8">
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;
