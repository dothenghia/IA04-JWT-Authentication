import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Layout as AntLayout, Menu, Space } from 'antd';
import { message } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';

const { Header, Content } = AntLayout;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    navigate('/login');
  };

  // If the current route is login or register, only render the Outlet
  if (location.pathname === '/login' || location.pathname === '/register') {
    return <Outlet />;
  }

  // If there's no user, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <AntLayout className="min-h-screen">
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
          <Menu.Item key="1"><Link to="/home">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/profile">Profile</Link></Menu.Item>
        </Menu>
        <Space>
          <Button onClick={handleLogout}>Logout</Button>
        </Space>
      </Header>
      <Content className="p-8">
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;