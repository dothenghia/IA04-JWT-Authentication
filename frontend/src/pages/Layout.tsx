import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Layout as AntLayout, Menu } from 'antd';
import { message } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';

const { Header, Content } = AntLayout;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  // Handle logout
  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    navigate('/login');
  };

  // If there's no user, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  // If the current route is login or register, only render the Outlet
  if (location.pathname === '/login' || location.pathname === '/register') {
    return <Outlet />;
  }

  return (
    <AntLayout className="min-h-screen">
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        height: '52px',
        lineHeight: '52px',
        padding: '0 20px'
      }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ flex: 1, height: '52px', lineHeight: '52px' }}
          items={[
            {
              key: '/home',
              label: <Link to="/home">Home</Link>
            },
            {
              key: '/profile',
              label: <Link to="/profile">Profile</Link>
            },
          ]}
        />
        <Button onClick={handleLogout}>Logout</Button>
      </Header>
      <Content className="p-8">
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;
