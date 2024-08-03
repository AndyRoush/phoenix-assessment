import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LandHoldingForm = ({ landHolding, onSubmit, onUpdate, onReset, owners }) => {
  const [section, setSection] = useState('');
  const [township, setTownship] = useState('');
  const [range, setRange] = useState('');
  const [legalEntity, setLegalEntity] = useState('');

  useEffect(() => {
    if (landHolding) {
      setSection(landHolding.section);
      setTownship(landHolding.township);
      setRange(landHolding.range);
      setLegalEntity(landHolding.legalEntity);
    }
  }, [landHolding]);

  const validationSchema = Yup.object({
    owner: Yup.string().required('Required'),
    legalEntity: Yup.string().required('Required'),
    netMineralAcres: Yup.number().required('Required'),
    mineralOwnerRoyalty: Yup.number().required('Required'),
    section: Yup.string().matches(/^\d{3}$/, 'Section must be exactly 3 numbers').required('Required'),
    township: Yup.string().matches(/^\d{3}[NS]$/, 'Township must start with 3 numbers and end with N or S').required('Required'),
    range: Yup.string().matches(/^\d{3}[EW]$/, 'Range must start with 3 numbers and end with E or W').required('Required'),
    titleSource: Yup.string().required('Required'),
  });

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const handleTownshipChange = (e) => {
    setTownship(e.target.value);
  };

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  const handleLegalEntityChange = (e) => {
    setLegalEntity(e.target.value);
  };

  const getName = (sectionName, legalEntity) => {
    return `${sectionName}-${legalEntity}`;
  };

  const getSectionName = (section, township, range) => {
    return `${section}-${township}-${range}`;
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const sectionName = getSectionName(values.section, values.township, values.range);
      const data = {
        ...values,
        name: getName(sectionName, values.legalEntity),
        sectionName: sectionName,
      };
      let response;
      if (landHolding) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/landholdings/${landHolding._id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        onUpdate(response.data);
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/landholdings`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        onSubmit(response.data);
      }
      resetForm();
      onReset();
    } catch (error) {
      console.error('Error saving land holding', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 w-full">
      <h1 className="text-2xl mb-4">{landHolding ? 'Edit Land Holding' : 'Add Land Holding'}</h1>
      <Formik
        initialValues={landHolding || {
          owner: '',
          legalEntity: '',
          netMineralAcres: '',
          mineralOwnerRoyalty: '',
          section: '',
          township: '',
          range: '',
          titleSource: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={getName(getSectionName(values.section, values.township, values.range), values.legalEntity)}
                readOnly
              />
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="owner"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Owner</option>
                {owners.map(owner => (
                  <option key={owner._id} value={owner._id}>{owner.ownerName}</option>
                ))}
              </Field>
              {touched.owner && errors.owner && (
                <div className="text-red-500">{errors.owner}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="legalEntity"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Legal Entity"
                value={values.legalEntity}
                onChange={(e) => {
                  handleLegalEntityChange(e);
                  values.legalEntity = e.target.value;
                }}
              />
              {touched.legalEntity && errors.legalEntity && (
                <div className="text-red-500">{errors.legalEntity}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="netMineralAcres"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Net Mineral Acres"
              />
              {touched.netMineralAcres && errors.netMineralAcres && (
                <div className="text-red-500">{errors.netMineralAcres}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="mineralOwnerRoyalty"
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Mineral Owner Royalty (%)"
              />
              {touched.mineralOwnerRoyalty && errors.mineralOwnerRoyalty && (
                <div className="text-red-500">{errors.mineralOwnerRoyalty}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="section"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Section"
                value={values.section}
                onChange={(e) => {
                  handleSectionChange(e);
                  values.section = e.target.value;
                }}
              />
              {touched.section && errors.section && (
                <div className="text-red-500">{errors.section}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="township"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Township"
                value={values.township}
                onChange={(e) => {
                  handleTownshipChange(e);
                  values.township = e.target.value;
                }}
              />
              {touched.township && errors.township && (
                <div className="text-red-500">{errors.township}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                name="range"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Range"
                value={values.range}
                onChange={(e) => {
                  handleRangeChange(e);
                  values.range = e.target.value;
                }}
              />
              {touched.range && errors.range && (
                <div className="text-red-500">{errors.range}</div>
              )}
            </div>
            <div className="mb-4">
              <Field
                as="select"
                name="titleSource"
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Title Source</option>
                <option value="Class A">Class A</option>
                <option value="Class B">Class B</option>
                <option value="Class C">Class C</option>
                <option value="Class D">Class D</option>
              </Field>
              {touched.titleSource && errors.titleSource && (
                <div className="text-red-500">{errors.titleSource}</div>
              )}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Save Land Holding
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LandHoldingForm;
