import React, { useState } from 'react';

const OtpVerification = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    // Handle verification logic
    console.log('Verification code:', verificationCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Verify Your Account</h2>
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label htmlFor="verificationCode" className="block text-gray-700 mb-2">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
