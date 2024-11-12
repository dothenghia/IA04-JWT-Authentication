import React from 'react';
import { Typography, Card } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';

const { Title } = Typography;

const HomePage: React.FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div className="max-w-4xl mx-auto text-center">
      <Title level={2}>Welcome to the Home Page</Title>
      <Card style={{ fontSize: '1.2rem' }}>
        <h1>
          Hello, {user?.username}! You are successfully logged in.
        </h1>
        <h1>
          This is a protected route that can only be accessed by authenticated users.
        </h1>
      </Card>
    </div>
  );
};

export default HomePage;
