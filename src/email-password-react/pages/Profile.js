import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Image,
  Col,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import Cookies from 'universal-cookie';

import ButtonComponent from '../components/ButtonComponent';
import './Profile.css';
import { Typography } from '@mui/material';
import { FaMedal, FaUserAlt } from 'react-icons/fa';

function Profile() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [newData, setNewData] = useState({ name: '', photo: '', bio: '' });
  const cookies = new Cookies();
  const token = cookies.get('token');
  const imageRef = useRef(null);

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

  const changeHandler = (e) => {
    const name = e.target.name;
    let value = null;
    if (name === 'photo') {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const updateProfileHandler = async () => {
    const formdata = new FormData();
    formdata.append('name', newData.name);
    formdata.append('photo', newData.photo);
    formdata.append('bio', newData.bio);
    await axios
      .patch('http://localhost:8000/api/user/updateme', formdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data.data);
        setNewData({ name: '', photo: '', bio: '' });
      })
      .catch((err) => console.log(err));
  };

  console.log(newData);

  return (
    <>
      {loaded && (
        <div>
          <Container className="Profile">
            <Row className="align-items-center ">
              <Col xs={12} sm={6} className="flex-column ">
                <Row className="justify-content-left ">
                  <Typography variant="h6" component="h1" className="Role">
                    {data.role}{' '}
                    {data.role === 'admin' ? (
                      <FaMedal
                        size="20"
                        style={{
                          color: 'yellow',
                          marginLeft: '5px',
                          marginBottom: '3px',
                        }}
                      />
                    ) : (
                      <FaUserAlt
                        size="20"
                        style={{
                          color: 'white',
                          marginLeft: '5px',
                          marginBottom: '3px',
                        }}
                      />
                    )}
                  </Typography>
                </Row>
                <Image
                  className="Image"
                  src={`http://localhost:8000/${data.photo}`}
                  alt={data.name}
                  roundedCircle
                />
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  style={{ display: 'none' }}
                  ref={imageRef}
                  onChange={changeHandler}
                />
                <Typography
                  variant="h5"
                  component="h1"
                  gutterBottom
                  sx={{
                    marginTop: '15px',
                    padding: '5px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '1.2rem',
                  }}
                  onClick={() => imageRef.current.click()}
                >
                  Change
                </Typography>
              </Col>
              <Col xs={12} sm={6}>
                <Form>
                  <Row className="justify-content-center">
                    <FormGroup className="Profile-Row">
                      <Typography
                        variant="h6"
                        component="h1"
                        className="d-flex justify-content-left"
                      >
                        Name
                      </Typography>
                      <FormControl
                        type="text"
                        placeholder="Enter full name"
                        name="name"
                        defaultValue={data.name}
                        onChange={changeHandler}
                      />
                    </FormGroup>
                  </Row>
                  <Row className="justify-content-center">
                    <FormGroup className="Profile-Row">
                      <Typography
                        variant="h6"
                        component="h1"
                        className="d-flex justify-content-right"
                      >
                        {' '}
                        Email{' '}
                      </Typography>
                      <FormControl
                        type="email"
                        placeholder="Enter email"
                        value={data.email ? data.email : ''}
                        readOnly
                      />
                    </FormGroup>
                  </Row>
                  <Row className="justify-content-center">
                    <FormGroup className="Profile-Row">
                      <Typography
                        variant="h6"
                        component="h1"
                        className="d-flex justify-content-left"
                      >
                        Bio
                      </Typography>
                      <FormControl
                        as="textarea"
                        className="bio"
                        placeholder="Write about yourself"
                        name="bio"
                        defaultValue={data.bio}
                        onChange={changeHandler}
                      />
                    </FormGroup>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row className="justify-content-center mt-5 pt-2">
              <ButtonComponent
                btnValue="Update"
                btnClickHandler={updateProfileHandler}
                disabled={
                  Object.values(newData).filter((el) => el === '').length > 2
                    ? true
                    : false
                }
              />
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default Profile;
