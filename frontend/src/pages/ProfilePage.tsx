import React, { useEffect, useState } from 'react';
import { Typography, Card, Descriptions, message } from 'antd';
import Loader from '../components/Loader';

import { User } from '../services/type';
import { getProfile } from '../services';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfileData(response.user);
        setIsLoading(false);
      } catch (error) {
        message.error('Failed to fetch profile');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Title level={2}>User Profile</Title>
      <Card>
        {profileData && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Username" style={{ fontSize: '1.1rem' }}>{profileData.username}</Descriptions.Item>
            <Descriptions.Item label="Email" style={{ fontSize: '1.1rem' }}>{profileData.email}</Descriptions.Item>
            <Descriptions.Item label="Phone" style={{ fontSize: '1.1rem' }}>{profileData.phone || '-'}</Descriptions.Item>
            <Descriptions.Item label="Created At" style={{ fontSize: '1.1rem' }}>
              {new Date(profileData.createdAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
