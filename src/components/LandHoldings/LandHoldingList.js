import React from 'react';

const LandHoldingList = ({ landHoldings, onEdit, onDelete }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 w-full">
      <h1 className="text-2xl mb-4">Land Holdings</h1>
      <ul>
        {landHoldings.map(landHolding => (
          <li key={landHolding._id} className="border p-4 mb-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl">{landHolding.name}</h2>
                <p>Owner: {landHolding.owner.ownerName}</p>
                <p>Legal Entity: {landHolding.legalEntity}</p>
                <p>Net Mineral Acres: {landHolding.netMineralAcres}</p>
                <p>Mineral Owner Royalty: {landHolding.mineralOwnerRoyalty}%</p>
                <p>Section Name: {landHolding.sectionName}</p>
                <p>Section: {landHolding.section}</p>
                <p>Township: {landHolding.township}</p>
                <p>Range: {landHolding.range}</p>
                <p>Title Source: {landHolding.titleSource}</p>
              </div>
              <div>
                <button
                  onClick={() => onEdit(landHolding)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(landHolding._id)}
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

export default LandHoldingList;
