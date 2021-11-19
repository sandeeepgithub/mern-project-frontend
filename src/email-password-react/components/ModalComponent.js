import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import {
  Col,
  FormControl,
  Modal,
  ModalBody,
  Row,
  Toast,
} from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import ToastComponent from './ToastComponent';

function ModalComponent({ openModal, setOpenModal }) {
  const [show, setShow] = useState(false); // show modal
  const [textbox, setTextbox] = useState(false); // show password input field
  const [adminPwd, setAdminPwd] = useState(''); // add pwd
  const [checkPassword, setCheckPassword] = useState(false); // loader to show pwd check
  const [toast, setToast] = useState(null); // for success/error message after check pwd

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  };

  useEffect(() => {
    setShow(openModal);
  }, [openModal]);

  const pwdHandler = () => {
    if (adminPwd.trim().length > 0) {
      setAdminPwd(false);
      setCheckPassword(true);
      setTimeout(() => {
        {
          setCheckPassword(false);
          if (adminPwd === 'Arjun98790!') {
            setTextbox(false);
            setShow(false);
            setToast(true);
          } else {
            setTextbox(false);
            setShow(false);
            setToast(false);
          }
        }
      }, 3000);
    }
  };
  return (
    <>
      <Modal style={style} show={show} onEscapeKeyDown={() => setShow(false)}>
        <ModalBody
          style={
            checkPassword ? { background: '#000' } : { background: '#fff' }
          }
        >
          {checkPassword ? (
            <div className="text-center">
              <CircularProgress />
              <p style={{ color: 'white' }}> Checking Password... </p>
            </div>
          ) : (
            <>
              <Typography variant="h5" body="h1">
                Do you really want to delete the user?
              </Typography>
              <p className="text-danger">
                This can only be reversed by the admin.
              </p>
              <Row
                style={
                  (textbox ? { display: 'block' } : { display: 'none' },
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  })
                }
              >
                <Col
                  xs={10}
                  style={textbox ? { display: 'block' } : { display: 'none' }}
                >
                  <FormControl
                    style={{
                      width: '70%',
                      margin: 'auto',
                    }}
                    type="text"
                    placeholder="Enter admin password"
                    onChange={(e) => setAdminPwd(e.target.value)}
                  />{' '}
                </Col>
                <Col xs={2}>
                  {' '}
                  <AiOutlineCheckCircle
                    color="green"
                    onClick={pwdHandler}
                    size="25"
                    style={textbox ? { display: 'block' } : { display: 'none' }}
                  />
                </Col>
              </Row>
              <Row
                className="mt-4 text-right"
                style={textbox ? { display: 'none' } : { display: 'block' }}
              >
                <Col>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{ marginRight: 2 }}
                    onClick={() => setTextbox(true)}
                  >
                    Yes
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      setOpenModal(false);
                      setTextbox(false);
                    }}
                  >
                    No
                  </Button>
                </Col>
              </Row>{' '}
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalComponent;
