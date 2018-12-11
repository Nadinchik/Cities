import React from 'react';
import Modal from "react-modal";
import FormCities from "../FormCities";

const ModalWindow = ({ isOpen, handleOpen, type, handleInput, modalData, addCity }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleOpen}
      ariaHideApp={true}
    >
      {
        type === 'add' ? 'input text' : 'input checkbox'
      }
      <FormCities
        modalData={modalData}
        handleInput={handleInput}
        addCity={addCity}
      />
    </Modal>
  );
};

export default ModalWindow;