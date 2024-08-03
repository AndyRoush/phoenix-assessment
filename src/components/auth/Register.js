import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, values)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      })
      .catch(error => {
        console.error('Error registering', error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">Register</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <Field
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="password"
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Password"
              />
              {touched.password && errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
