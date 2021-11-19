import React, { useState } from 'react';
import axios from 'axios';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import ButtonComponent from '../components/ButtonComponent';
import { MESSAGE_CONSTANT } from '../constants/MessageConstant';
import { Typography } from '@mui/material';
import ToastComponent from '../components/ToastComponent';

function Login() {
  const [responseData, setResponseData] = useState(null);
  const [toast, setToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const cookies = new Cookies();

  const onSubmit = async (data) => {
    setToast(false);
    await axios
      .post('http://127.0.0.1:8000/api/auth/login/', data, {
        withCredentials: true,
      })
      .then((res) => {
        setResponseData(true);
        setToast(true);

        cookies.set('token', res.data.token);
        cookies.set('expiresIn', res.data.cookieOptions.expires);
        setTimeout(() => {
          history.replace('/');
          history.push('/');
        }, 3000);
      })
      .catch((err) => {
        setResponseData(false);
        setToast(true);
      });
  };

  return (
    <Container className="Container p-2">
      riya@arjun.io Riya123!
      <ToastComponent
        isOpen={toast}
        message={responseData === true ? 'Login Success' : 'Login Failed'}
        response={responseData === true ? 'success' : 'error'}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="Row m-4">
          <Col xs={5} sm={4}>
            <Typography variant="h5" component="h1">
              Email:
            </Typography>
          </Col>
          <Col xs={8} sm={8}>
            <FormControl
              {...register('email', {
                required: 'Please enter email',
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
              type="email"
              placeholder="Enter email"
            />
            {errors?.email?.type === 'required' && (
              <span className="Error"> {MESSAGE_CONSTANT.email.required} </span>
            )}
            {errors?.email?.type === 'pattern' && (
              <span className="Error"> {MESSAGE_CONSTANT.email.valid} </span>
            )}
          </Col>
        </Row>
        <Row className="Row m-4">
          <Col xs={5} sm={4}>
            <Typography variant="h5" component="h1">
              Password:
            </Typography>
          </Col>
          <Col xs={8} sm={8}>
            <FormControl
              {...register('password', {
                required: 'Please enter password',
                pattern:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
              })}
              type="password"
              placeholder="Enter password"
            />
            {errors?.password?.type === 'required' && (
              <span className="Error">
                {' '}
                {MESSAGE_CONSTANT.password.required}{' '}
              </span>
            )}
            {errors?.password?.type === 'pattern' && (
              <span className="Error"> {MESSAGE_CONSTANT.password.valid} </span>
            )}
          </Col>
        </Row>
        <Row className="Row-Button justify-content-around mb-4">
          <ButtonComponent btnType={'submit'} btnValue={'Submit'} />
          <Link to="/signup">
            <ButtonComponent btnValue={'Signup'} />
          </Link>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
