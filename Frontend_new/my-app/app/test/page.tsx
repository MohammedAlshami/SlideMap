'use client';
import React, { useState } from 'react'
import OperationStatusModal from '../components/Modal/OperationStatusModal';
const page = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <button className="btn" onClick={handleOpenModal}>
        Open Modal
      </button>
      <OperationStatusModal success={showModal} onClose={handleCloseModal} />
    </div>
  )
}

export default page