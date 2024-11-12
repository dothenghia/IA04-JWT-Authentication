import React, { useEffect, useState } from 'react';
import { Typography, Card, Descriptions, message, Spin } from 'antd';
import { getProfile } from '../services';
import { User } from '../services/type';
import Loader from '../components/Loader';

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
          <Descriptions bordered>
            <Descriptions.Item label="Username" span={3}>{profileData.username}</Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>{profileData.email}</Descriptions.Item>
            <Descriptions.Item label="Phone" span={3}>{profileData.phone || '-'}</Descriptions.Item>
            <Descriptions.Item label="Created At" span={3}>
              {new Date(profileData.createdAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
