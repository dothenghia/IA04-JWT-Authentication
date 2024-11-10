import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services';
import axios from 'axios';
import { ErrorMessage } from '../services/type';
import Loader from '../components/Loader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login({ email, password });
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/home');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.data && Array.isArray(err.response.data.message)) {
          setErrors(err.response.data.message);
        } else {
          setErrors([{ field: 'general', message: 'An error occurred during login' }]);
        }
      } else {
        setErrors([{ field: 'general', message: 'An unexpected error occurred' }]);
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome</h2>
          </div>
          <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
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
                  autoComplete="current-password"
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
                Log in
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/register" className="font-medium text-blue-500 hover:text-blue-600">
              Register for an account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
