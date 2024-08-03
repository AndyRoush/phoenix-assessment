import React from 'react';
import axios from 'axios';

const OwnerList = ({ owners, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/owners/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onDelete(id);
    } catch (error) {
      console.error('Error deleting owner', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Owners</h1>
      <ul>
        {owners.map(owner => (
          <li key={owner._id} className="border p-4 mb-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-medium">{owner.ownerName}</h2>
                <p>Entity Type: {owner.entityType}</p>
                <p>Owner Type: {owner.ownerType}</p>
                <p>Address: {owner.address}</p>
                <p>Total Land Holdings: {owner.totalLandHoldings}</p>
              </div>
              <div>
                <button
                  onClick={() => onEdit(owner)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(owner._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerList;
