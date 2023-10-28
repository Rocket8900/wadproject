import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FiAlertCircle } from "react-icons/fi";

const ExampleWrapper = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="px-4 py-5 bg-slate-900 text-center">
      <Button
        variant="primary"
        onClick={handleModalOpen}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover-opacity-90"
      >
        Open Modal
      </Button>
      <SpringModal show={showModal} handleClose={handleModalClose} />
    </div>
  );
};

const SpringModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <div className="bg-slate-900/20 backdrop-blur p-5 grid place-items-center overflow-y-scroll cursor-pointer">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-3 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden">
          <FiAlertCircle className="text-black/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-black text-3xl text-indigo-600 grid place-items-center mx-auto">
              <FiAlertCircle />
            </div>
            <h3 className="text-black text-3xl font-bold text-center mb-2">
              One more thing!
            </h3>
            <p className="text-center text-black mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id aperiam vitae, sapiente ducimus eveniet in velit.
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <Button variant="secondary" onClick={handleClose} className="text-black font-semibold py-2 rounded">
                Nah, go back
              </Button>
              <Button variant="primary" onClick={handleClose} className="text-black font-semibold py-2 rounded">
                Understood!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExampleWrapper;
