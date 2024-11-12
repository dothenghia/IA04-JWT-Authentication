import React from 'react';
import { Typography, Card } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>Welcome to the Home Page</Title>
      <Card>
        <Paragraph>
          Hello, {user?.username}! You are successfully logged in.
        </Paragraph>
        <Paragraph>
          This is a protected route that can only be accessed by authenticated users.
        </Paragraph>
      </Card>
    </div>
  );
};

export default HomePage;
