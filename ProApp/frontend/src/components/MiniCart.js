import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

function MiniCart({ open, onClose }) {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 320 }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            Shopping Cart ({cart.items.length})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {cart.items.length > 0 ? (
          <>
            <List sx={{ mb: 2 }}>
              {cart.items.map((item) => (
                <ListItem key={item.product.id}>
                  <ListItemAvatar>
                    <Avatar src={item.product.imageUrl} variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={item.product.name}
                    secondary={
                      <Typography variant="body2">
                        {formatCurrency(item.product.price)} × {item.quantity}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="h6" align="right">
                Total: {formatCurrency(cart.total)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              sx={{
                py: 1.5,
                borderRadius: 2
              }}
            >
              Checkout
            </Button>
          </>
        ) : (
          <Box sx={{ 
            py: 8, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            color: 'text.secondary'
          }}>
            <Typography variant="body1" gutterBottom>
              Your cart is empty
            </Typography>
            <Button 
              color="primary" 
              onClick={onClose}
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default MiniCart; 