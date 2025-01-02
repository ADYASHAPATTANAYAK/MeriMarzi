import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { 
  Grid, 
  Container, 
  Typography, 
  CircularProgress,
  Box,
} from '@mui/material';
import ProductCard from '../components/ProductCard';

function Products() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Container>
  );
  
  if (error) return (
    <Container>
      <Typography color="error">Error: {error.message}</Typography>
    </Container>
  );

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          sx={{ 
            mb: 6,
            fontWeight: 800,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#800000',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: 'linear-gradient(45deg, #800000 30%, #B22222 90%)',
              borderRadius: '2px'
            }
          }}
        >
          Our Collection
        </Typography>
        <Grid container spacing={4}>
          {data?.products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Products; 