import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgressWithLabel from '../../components/@extended/CircularWithValueLabel';
import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const EditProfilePage = () => (
  <>
    <MainCard title="Edit Profile">
      <Paper
        elevation={0}
        sx={{
          padding: '15px',
          background: 'rgb(255, 244, 230)'
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <CircularProgressWithLabel value={1} />
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    display: 'block'
                  }}
                >
                  Edit Your Profile
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  sx={{
                    display: 'block'
                  }}
                >
                  Complete your profile to unlock all features
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* Segunda coluna para o Botão, que muda para uma nova linha em telas pequenas */}
          <Grid item xs={12} sm={'auto'}>
            <Button variant="contained" color="primary" fullWidth>
              Edit your profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </MainCard>
  </>
);

export default EditProfilePage;
