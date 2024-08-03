import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerForm from "../components/Owners/OwnerForm";
import OwnerList from "../components/Owners/OwnerList";
import LandHoldingForm from "../components/LandHoldings/LandHoldingForm";
import LandHoldingList from "../components/LandHoldings/LandHoldingList";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [owners, setOwners] = useState([]);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [landHoldings, setLandHoldings] = useState([]);
  const [selectedLandHolding, setSelectedLandHolding] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwners();
    fetchLandHoldings();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/owners`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners", error);
    }
  };

  const fetchLandHoldings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/landholdings`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLandHoldings(response.data);
    } catch (error) {
      console.error("Error fetching land holdings", error);
    }
  };

  const addOwner = (owner) => {
    setOwners([...owners, owner]);
  };

  const updateOwner = (updatedOwner) => {
    setOwners(
      owners.map((owner) =>
        owner._id === updatedOwner._id ? updatedOwner : owner
      )
    );
  };

  const deleteOwner = (ownerId) => {
    setOwners(owners.filter((owner) => owner._id !== ownerId));
  };

  const addLandHolding = (landHolding) => {
    setLandHoldings([...landHoldings, landHolding]);
  };

  const updateLandHolding = (updatedLandHolding) => {
    setLandHoldings(
      landHoldings.map((landHolding) =>
        landHolding._id === updatedLandHolding._id
          ? updatedLandHolding
          : landHolding
      )
    );
  };

  const deleteLandHolding = (landHoldingId) => {
    setLandHoldings(
      landHoldings.filter((landHolding) => landHolding._id !== landHoldingId)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between align-middle mb-8">
        <h1 className="text-4xl">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="border-solid border-red-500 border-2 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white"
        >
          Logout
        </button>
      </div>
      <div className="mb-8 grid grid-cols-2">
        <OwnerForm
          owner={selectedOwner}
          onSubmit={addOwner}
          onUpdate={updateOwner}
          onReset={() => setSelectedOwner(null)}
        />
        <OwnerList
          owners={owners}
          onEdit={setSelectedOwner}
          onDelete={deleteOwner}
        />
      </div>
      <div className="mb-8 grid grid-cols-2">
        <LandHoldingForm
          landHolding={selectedLandHolding}
          onSubmit={addLandHolding}
          onUpdate={updateLandHolding}
          onReset={() => setSelectedLandHolding(null)}
          owners={owners}
        />
        <LandHoldingList
          landHoldings={landHoldings}
          onEdit={setSelectedLandHolding}
          onDelete={deleteLandHolding}
        />
      </div>
    </div>
  );
};

export default Dashboard;
