import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

function CardComponent({ cardImg, cardName, cardEmail }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={cardImg}
          alt={cardName}
          sx={{ borderRadius: 10 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardEmail}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardComponent;
