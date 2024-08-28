import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
import './auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login(username, password);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);

      switch (data.role) {
        case 'voter':
          navigate('/voter/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'candidate':
          navigate('/candidate/dashboard');
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-white p-8 shadow-lg">
        <div className="w-full max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Login Icon"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-blue-500">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-blue-500 hover:text-blue-700 transition ease-in-out duration-150"
            >
              create a new account
            </Link>
          </p>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out sm:text-sm"
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-blue-500 hover:text-blue-700 transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden sm:block w-1/2 bg-gray-200">
        <img
          src="https://img.freepik.com/free-vector/electronic-voting-abstract-concept-illustration_335657-1876.jpg?t=st=1724847280~exp=1724850880~hmac=963e03d25fb302625252842b94a344518cbda0bb83acc193b3d772f97de05b1f&w=740"
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;
