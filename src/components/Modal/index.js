import React from "react";
import Modal from "react-modal";
import FormCities from "../FormCities";
import FormAttraction from "../FormAttraction";

const ModalWindow = ({ children, isOpen, handleOpen, type, city, handleInput, addCity, editCity, attraction, addAttr, editAttr }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleOpen}
      ariaHideApp={false}
    >
      {
        type === "add" ? (
          <FormCities
            city={city}
            handleInput={handleInput}
            addCity={addCity}
            editCity={editCity}
          />
        ) : (<FormAttraction
          attraction={attraction}
          handleInput={handleInput}
          addAttr={addAttr}
          editCity={editAttr}
        />)
      }
      {children}
    </Modal>
  );
};

export default ModalWindow;