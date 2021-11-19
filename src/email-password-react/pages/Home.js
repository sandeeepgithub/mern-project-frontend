import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import axios from 'axios';

import UserTileComponent from '../components/UserTileComponent';
import ToastComponent from '../components/ToastComponent';
import { Backdrop } from '@mui/material';

function Home() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');

  useEffect(async () => {
    await axios
      .get('http://127.0.0.1:8000/api/user/getme/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const getUsersHandler = async () => {
    await axios
      .get('http://localhost:8000/api/user/getall', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };

  const deleteUser = async (id) => {
    await axios
      .patch(
        'http://localhost:8000/api/user/deleteuser',
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => (
        <ToastComponent
          message="Success!! User Deleted. "
          response={res.data.status}
          isOpen={true}
        />
      ))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {loaded && data.role === 'admin' ? (
        <Container>
          <Button onClick={getUsersHandler}> Get All Users </Button>
          <Row className="justify-content-center">
            {users
              ? users.map((el) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    className="UserTile my-4 "
                    key={el.name}
                    style={el.isActive ? null : { opacity: '0.3' }}
                  >
                    <UserTileComponent
                      name={el.name}
                      email={el.email}
                      image={el.photo}
                      bio={el.bio}
                      deleteUser={deleteUser}
                      id={el._id}
                    />
                  </Col>
                ))
              : null}
          </Row>
        </Container>
      ) : (
        <h1> Home </h1>
      )}
    </>
  );
}

export default Home;
