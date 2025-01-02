import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import MiniCart from './MiniCart';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', boxShadow: 2 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={() => navigate('/')}
          >
            <ShoppingBagIcon 
              sx={{ 
                color: 'primary.main', 
                mr: 1,
                fontSize: '2rem'
              }} 
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                color: 'primary.main',
                fontWeight: 900,
                letterSpacing: 2,
                fontSize: '1.5rem',
                fontFamily: "'Inter', sans-serif",
                background: 'linear-gradient(45deg, #800000 30%, #B22222 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              MERI MARZI
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              color="primary"
              onClick={() => navigate('/')}
              startIcon={<HomeIcon />}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(128, 0, 0, 0.04)'
                }
              }}
            >
              Home
            </Button>
            
            {user ? (
              <>
                <IconButton 
                  color="primary"
                  onClick={handleMenuClick}
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/profile');
                  }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/orders');
                  }}>
                    Orders
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    logout();
                  }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  color="primary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </Button>
              </>
            )}
            
            <IconButton 
              color="primary" 
              onClick={() => setCartOpen(true)}
              sx={{ ml: 1 }}
            >
              <Badge badgeContent={cart.items.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <MiniCart 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </AppBar>
  );
}

export default Navbar; 