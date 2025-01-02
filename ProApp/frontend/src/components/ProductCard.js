import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
  Rating,
} from '@mui/material';
import { formatCurrency } from '../utils/formatCurrency';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || 'https://via.placeholder.com/200'}
        alt={product.name}
        sx={{ 
          objectFit: 'contain',
          p: 2,
          bgcolor: 'grey.50'
        }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{ 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            height: '2.8em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={4.5} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            (4.5)
          </Typography>
        </Box>
        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
          {formatCurrency(product.price)}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant="contained"
          color="primary"
          onClick={() => navigate(`/product/${product.id}`)}
          fullWidth
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            py: 1,
            fontSize: '1rem'
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard; 