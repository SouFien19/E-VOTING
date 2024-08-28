import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordConfirmationValid, setPasswordConfirmationValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    // Here you would perform the registration logic
    // For example, await register(username, email, password, role);

    setSuccess(true);
    setTimeout(() => {
      // Redirect or any additional logic after successful registration
    }, 2000);
  };

  const calculatePasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const criteriaCount = [lengthCriteria, upperCaseCriteria, lowerCaseCriteria, numberCriteria, specialCharCriteria].filter(Boolean).length;
    return (criteriaCount / 5) * 100;
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    const strength = calculatePasswordStrength(value);
    setPasswordValid(strength === 100);
  };

  const handlePasswordConfirmationChange = (event) => {
    const value = event.target.value;
    setPasswordConfirmation(value);

    // Check if the confirmation password matches the main password
    setPasswordConfirmationValid(value === password);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const strengthPercentage = `${Math.min(100, calculatePasswordStrength(password))}%`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500">
          Or{' '}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            login to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                  placeholder="john"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            <div className="mt-6 relative">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={handlePasswordChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${passwordValid ? 'border-green-500 focus:border-green-600' : 'border-gray-300 focus:border-blue-500'}`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3C7.03 3 3.12 6.24 1 10.59c1.89 2.54 5.01 4.41 9 4.41s7.11-1.87 9-4.41C20.88 6.24 16.97 3 12 3zM12 15c-1.48 0-2.85-.5-4-1.32C8.15 13.4 10.02 14 12 14s3.85-.6 4.85-1.32C14.85 14.5 13.48 15 12 15z" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3C7.03 3 3.12 6.24 1 10.59c1.89 2.54 5.01 4.41 9 4.41s7.11-1.87 9-4.41C20.88 6.24 16.97 3 12 3zM12 15c-1.48 0-2.85-.5-4-1.32C8.15 13.4 10.02 14 12 14s3.85-.6 4.85-1.32C14.85 14.5 13.48 15 12 15z" />
                  </svg>
                )}
              </button>
              <div id="password-strength" className="flex mt-2 h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${passwordValid ? 'bg-teal-500' : 'bg-red-500'}`}
                  style={{ width: strengthPercentage }}
                />
              </div>
              {!passwordValid && password && (
                <p className="mt-2 text-sm text-red-600">
                  Password must be at least 8 characters long and include a number and a special character.
                </p>
              )}
            </div>

            <div className="mt-6 relative">
              <label htmlFor="password_confirmation" className="block text-sm font-medium leading-5 text-gray-700">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type={showPasswordConfirmation ? 'text' : 'password'}
                required
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ease-in-out ${passwordConfirmationValid ? 'border-green-500 focus:border-green-600' : 'border-gray-300 focus:border-blue-500'}`}
                placeholder="Confirm password"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="role" className="block text-sm font-medium leading-5 text-gray-700">
                Role
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm"
                >
                  <option value="" disabled>Select role</option>
                  <option value="voter">Voter</option>
                  <option value="candidate">Candidate</option>
                </select>
              </div>
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {success && <p className="mt-2 text-sm text-green-600">Registration successful!</p>}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-base font-medium text-white focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
