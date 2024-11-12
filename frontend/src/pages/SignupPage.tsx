import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { message } from 'antd';

import axios from 'axios';
import { register } from '../services';
import { ErrorMessage } from '../services/type';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = { username, email, password };
      if (phone) {
        Object.assign(userData, { phone });
      }
      await register(userData);
      message.success('Registration successful');
      navigate('/login');
    }
    catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.data && Array.isArray(err.response.data.message)) {
          setErrors(err.response.data.message);
        } else {
          setErrors([{ field: 'general', message: 'An error occurred during registration' }]);
        }
        message.error('Registration failed');
      } else {
        setErrors([{ field: 'general', message: 'An unexpected error occurred' }]);
        message.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Get errormessage for field
  const getErrorForField = (fieldName: string) => {
    return errors.find(error => error.field === fieldName)?.message;
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register account</h2>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${getErrorForField('username') ? 'border-red-500' : 'border-gray-300'}
                  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 
                  focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {getErrorForField('username') && (
                  <p className="mt-2 text-sm text-red-600">{getErrorForField('username')}</p>
                )}
              </div>

              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${getErrorForField('email') ? 'border-red-500' : 'border-gray-300'}
                  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 
                  focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {getErrorForField('email') && (
                  <p className="mt-2 text-sm text-red-600">{getErrorForField('email')}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${getErrorForField('password') ? 'border-red-500' : 'border-gray-300'}
                  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 
                  focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {getErrorForField('password') && (
                  <p className="mt-2 text-sm text-red-600">{getErrorForField('password')}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border 
                  ${getErrorForField('phone') ? 'border-red-500' : 'border-gray-300'}
                  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 
                  focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {getErrorForField('phone') && (
                  <p className="mt-2 text-sm text-red-600">{getErrorForField('phone')}</p>
                )}
              </div>
            </div>

            {getErrorForField('general') && (
              <p className="mt-2 text-center text-sm text-red-600">{getErrorForField('general')}</p>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
