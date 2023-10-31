import '../Home.css';
import { useHandleForm } from './hooks/useHandleForm'
import Info from './components/Info';
import MyForm from './components/Form';
import { motion as m } from 'framer-motion'
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RegiModal = ({ isRegiOpen, setRegiOpen }) => {
  const { step, next, prev, goto } = useHandleForm(['0', '1', '2', '3', '4']);

  return (
    <Modal show={isRegiOpen} onHide={() => setRegiOpen(false)} dialogClassName="modal-xl modal-dialog-centered">
      <div
        style={{ backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center"}}
      >

        <m.main
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          className='form-box'
        >
          <Container>
            <Row>
              <Col lg={4} md={12}>
                <Info step={step} />
              </Col>
              <Col lg ={8} md={12}>
                <MyForm step={step} next={next} prev={prev} goto={goto} />
              </Col>
            </Row>
          </Container>
        </m.main>

      </div>
    </Modal>
  );
};

export default RegiModal;
