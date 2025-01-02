import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { 
  Grid, 
  Container, 
  Typography, 
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';

function Home() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const navigate = useNavigate();

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
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(45deg, #800000 30%, #B22222 90%)',
          color: 'white',
          py: 12,
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            animation: 'pulse 3s infinite'
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 900,
                  mb: 2,
                  fontSize: { xs: '3.5rem', md: '5rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                  fontFamily: "'Inter', sans-serif",
                  position: 'relative',
                  display: 'inline-block',
                  background: 'linear-gradient(45deg, #FFFFFF 30%, #FFD700 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '0',
                    width: '100%',
                    height: '4px',
                    background: 'linear-gradient(45deg, #FFFFFF 30%, #FFD700 90%)',
                    borderRadius: '2px',
                    animation: 'shimmer 2s infinite linear'
                  },
                  '@keyframes shimmer': {
                    '0%': {
                      opacity: 0.5,
                    },
                    '50%': {
                      opacity: 1,
                    },
                    '100%': {
                      opacity: 0.5,
                    }
                  }
                }}
              >
                MERI MARZI
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                  fontStyle: 'italic'
                }}
              >
                Where Style Meets Freedom
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/products')}
                startIcon={<LocalMallIcon />}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  py: 2,
                  px: 4,
                  fontSize: '1.2rem',
                  borderRadius: '50px',
                  textTransform: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Collection
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  p: 4,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              >
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    background: 'linear-gradient(45deg, #FFF 30%, #FFD700 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Express Yourself
                </Typography>
                <Typography 
                  variant="h6" 
                  paragraph 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.8,
                    fontWeight: 300
                  }}
                >
                  Break free from fashion norms! At MERI MARZI, we celebrate your unique style with trendsetting designs and unmatched comfort.
                </Typography>
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      color: '#FFD700'
                    }}
                  >
                    #WhyWe'reDifferent
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {['Bold Designs', 'Premium Quality', 'Trendsetting Styles', 'Express Shipping'].map((item) => (
                      <Grid item xs={6} key={item}>
                        <Box 
                          sx={{ 
                            p: 2,
                            bgcolor: 'rgba(255,255,255,0.05)',
                            borderRadius: '10px',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              bgcolor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                        >
                          <Typography variant="body1">{item}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Products Section */}
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
          Trending Now
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

export default Home; 