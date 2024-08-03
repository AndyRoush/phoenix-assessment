import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const OwnerForm = ({ owner, onSubmit, onUpdate, onReset }) => {
  const validationSchema = Yup.object({
    ownerName: Yup.string().required('Required'),
    entityType: Yup.string().required('Required'),
    ownerType: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      let response;
      if (owner) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/owners/${owner._id}`, values, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        onUpdate(response.data);
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/owners`, values, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        onSubmit(response.data);
      }
      resetForm();
      onReset();
    } catch (error) {
      console.error('Error saving owner', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 w-full">
      <h1 className="text-2xl mb-4">{owner ? 'Edit Owner' : 'Add Owner'}</h1>
      <Formik
        initialValues={owner || { ownerName: '', entityType: '', ownerType: '', address: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4">
              <Field
                name="ownerName"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Owner Name"
              />
              {touched.ownerName && errors.ownerName && (
                <div className="text-red-500">{errors.ownerName}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="entityType"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Entity Type</option>
                <option value="Company">Company</option>
                <option value="Individual">Individual</option>
                <option value="Investor">Investor</option>
                <option value="Trust">Trust</option>
              </Field>
              {touched.entityType && errors.entityType && (
                <div className="text-red-500">{errors.entityType}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="ownerType"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Owner Type</option>
                <option value="Competitor">Competitor</option>
                <option value="Seller">Seller</option>
                <option value="Investor">Investor</option>
                <option value="Professional">Professional</option>
              </Field>
              {touched.ownerType && errors.ownerType && (
                <div className="text-red-500">{errors.ownerType}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="address"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Address"
              />
              {touched.address && errors.address && (
                <div className="text-red-500">{errors.address}</div>
              )}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Save Owner
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OwnerForm;
