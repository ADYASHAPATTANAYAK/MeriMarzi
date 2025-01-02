import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import {
  Container,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const { me } = data;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Username</Typography>
            <Typography variant="body1">{me.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Email</Typography>
            <Typography variant="body1">{me.email}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Profile; 