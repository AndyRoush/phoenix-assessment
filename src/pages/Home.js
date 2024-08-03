import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 text-center">
      <h1 className="text-4xl mb-4">Phoenix Assessment</h1>
      <Link to="/login" className="text-blue-500">Login</Link> | <Link to="/register" className="text-blue-500">Register</Link>
    </div>
  );
};

export default Home;
