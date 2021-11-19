import axios from 'axios';
import React, { useRef } from 'react';
import { Typography } from '@mui/material';
import { Col, Container, FormControl, FormLabel, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import ButtonComponent from '../components/ButtonComponent';

import { MESSAGE_CONSTANT } from '../constants/MessageConstant';
import './Login.css';
import Cookies from 'universal-cookie';

function Signup() {
  const cookies = new Cookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    await axios
      .post('http://127.0.0.1:8000/api/auth/signup/', data)
      .then(
        (res) => {
          console.log(res);
          cookies.set('token', res.data.token);
          cookies.set('expiresIn', res.data.cookieOptions.expires);
          history.replace('/');
          history.push('/');
        }
      )
      .catch((err) => console.log(err));
  };

  const inputRef = useRef(null);

  return (
    <Container className="Container">
      <Row className="Login-Box flex-column">
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: '700' }}
        >
          Create your account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-4 Row">
            <Col xs={1} sm={4} md={3}>
              <Typography variant="h5" component="h1">Name:</Typography>
            </Col>
            <Col xs={12} sm={8} md={8}>
              <FormControl
                ref={inputRef}
                type="text"
                placeholder="Enter your name"
                {...register('name', {
                  required: MESSAGE_CONSTANT.name.required,
                })}
              />
              {errors?.name && errors?.name?.type === 'required' && (
                <p className="Error"> {errors?.name?.message} </p>
              )}
            </Col>
          </Row>
          <Row className="mt-4 Row">
            <Col xs={1} sm={4} md={3}>
              <Typography variant="h5" component="h1">Email:</Typography>
            </Col>
            <Col xs={12} sm={8} md={8}>
              <FormControl
                ref={inputRef}
                type="email"
                placeholder="Enter email"
                {...register('email', {
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  required: MESSAGE_CONSTANT.email.required,
                })}
              />
              {errors?.email?.type === 'required' && (
                <p className="Error"> {errors?.email?.message} </p>
              )}
              {errors?.email?.type === 'pattern' && (
                <p className="Error"> {MESSAGE_CONSTANT.email.valid} </p>
              )}
            </Col>
          </Row>
          <Row className="mt-4 Row">
            <Col xs={1} sm={4} md={3}>
              <Typography variant="h5" component="h1">Password:</Typography>
            </Col>
            <Col xs={12} sm={8} md={8}>
              <FormControl
                type="password"
                placeholder="Enter password"
                {...register('password', {
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                  required: MESSAGE_CONSTANT.password.required,
                })}
              />
              {errors?.password?.type === 'required' && (
                <p className="Error">{errors?.password?.message}</p>
              )}
              {errors?.password?.type === 'pattern' && (
                <p className="Error">{MESSAGE_CONSTANT.password.valid}</p>
              )}
            </Col>
          </Row>
          <Row className="mt-4 Row">
            <Col xs={5} sm={4} md={3}>
              <Typography variant="h5" component="h1">Confirm Password:</Typography>
            </Col>
            <Col xs={11} sm={8} md={8}>
              <FormControl
                type="password"
                placeholder="Enter confirm password"
                {...register('confirmPassword', {
                  pattern:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
                  required: MESSAGE_CONSTANT.confirmPassword.required,
                })}
              />
              {errors?.confirmPassword?.type === 'required' && (
                <p className="Error">{errors?.confirmPassword.message}</p>
              )}
              {errors?.confirmPassword?.type === 'pattern' && (
                <p className="Error">
                  {MESSAGE_CONSTANT.confirmPassword.valid}
                </p>
              )}
            </Col>
          </Row>
          <Row className="mt-4 mb-3 pb-0">
            <Col xs={6}>
              <Link to="/login">
                {' '}
                <ButtonComponent btnValue="Login" />
              </Link>
            </Col>
            <Col xs={6}>
              <ButtonComponent btnType={'submit'} btnValue={'Submit'} />

            </Col>
          </Row>
        </form>
      </Row>
    </Container>
  );
}

export default Signup;
