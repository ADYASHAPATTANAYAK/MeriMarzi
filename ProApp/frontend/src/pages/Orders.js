import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDERS } from '../graphql/queries';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';

function Orders() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Grid container spacing={3}>
        {data.orders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Order #{order.id.slice(-6)}
                    </Typography>
                    <Typography color="textSecondary">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Chip
                      label={order.status}
                      color={
                        order.status === 'Delivered'
                          ? 'success'
                          : order.status === 'Shipped'
                          ? 'primary'
                          : 'warning'
                      }
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  {order.items.map((item) => (
                    <Grid item xs={12} key={item.product.id}>
                      <Typography>
                        {item.product.name} x {item.quantity}
                      </Typography>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Total: ${order.total.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Orders; 