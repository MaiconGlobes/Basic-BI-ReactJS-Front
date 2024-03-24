import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgressWithLabel from '../../components/@extended/CircularWithValueLabel';
import { Typography, Link } from '@mui/material';
import MainCard from 'components/MainCard';
import { MoreOutlined } from '@ant-design/icons';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

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
          <Grid item xs={12} sm={'auto'}>
            <Button variant="contained" color="primary" fullWidth>
              Edit your profile
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          padding: '15px'
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="left">
          <Grid item md={4} sm={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
                //  background: 'blue'
              }}
            >
              
LEFT

            </Box>
          </Grid>
          <Grid item md={8} sm={12}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
                //  background: 'green'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  // background: 'red',
                  gap: 2
                }}
              >
                
RIGTH
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </MainCard>
  </>
);

export default EditProfilePage;
