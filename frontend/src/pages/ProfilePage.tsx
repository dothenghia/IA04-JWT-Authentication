import React, { useEffect, useState } from 'react';
import { getProfile } from '../services';
import Loader from '../components/Loader';
import { message } from 'antd';
import { useAuthStore } from '../stores/useAuthStore';

const ProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getProfile(); // This is just to verify the token
        setIsLoading(false);
      } catch (error) {
        message.error('Failed to fetch profile');
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Profile</h2>
        </div>
        {user && (
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="p-4 bg-white">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
