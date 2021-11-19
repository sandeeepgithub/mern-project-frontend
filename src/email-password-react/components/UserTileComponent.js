import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { AiFillDelete } from 'react-icons/ai';
import ModalComponent from './ModalComponent';

function UserTileComponent({
  name,
  image,
  email,
  bio,
  deleteUser,
  id,
  ...props
}) {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal} />
      <Card id="User">
        <CardMedia
          component="img"
          height="200"
          src={`http://localhost:8000/${image}`}
          alt={name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="GrayText" gutterBottom>
            {email}
          </Typography>
          <ExpandMore
            expand={expanded.toString()}
            onClick={() => {
              setExpanded(!expanded);
            }}
            sx={
              expanded
                ? { transform: 'rotate(180deg)' }
                : { transform: 'rotate(00deg)' }
            }
            style={{ transition: '0.8s' }}
          ></ExpandMore>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body1" component="div">
                {bio}
              </Typography>
            </CardContent>
            <AiFillDelete
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenModal(true);
                deleteUser(id);
              }}
            />
          </Collapse>
        </CardContent>
      </Card>
    </>
  );
}

export default UserTileComponent;
