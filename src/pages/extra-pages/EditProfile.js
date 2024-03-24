import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgressWithLabel from '../../components/@extended/CircularWithValueLabel';
import { Typography, CardMedia } from '@mui/material';
import MainCard from 'components/MainCard';
import { MoreOutlined } from '@ant-design/icons';
import avatar from 'assets/images/users/avatar-group.png';
import { deepOrange } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import EditProfileForm from '../authentication/auth-forms/EditProfile';

const EditProfilePage = () => (
   <>
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
                        Finalizar edição de perfil
                     </Typography>
                     <Typography
                        variant="body2"
                        color="secondary"
                        sx={{
                           display: 'block'
                        }}
                     >
                        Complete seu perfil para desbloquear todos os recursos
                     </Typography>
                  </Box>
               </Box>
            </Grid>
            <Grid item xs={12} sm={'auto'}>
               <Button variant="contained" color="primary" fullWidth>
                  Editar meu perfil
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
         <Grid container spacing={2} alignItems="start" justifyContent="left">
            <Grid item xs={12} sm={12} md={4} lg={4} >
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: 2,
                     border: '1px solid rgb(230, 235, 241)',
                     background: 'aqua'
                  }}
               >
                  <Box
                     sx={{
                        // justifyContent: 'center',
                        gap: 2
                     }}
                  >
                     <Box
                        sx={{
                           maxWidth: { md: '100vh', xs: 400, lg: '100vh' },
                           margin: { xs: 2.5, md: 3 },
                           '& > *': {
                              flexGrow: 1,
                              flexBasis: '100%'
                           },
                        }}
                     >
                        <Box sx={{
                           p: { xs: 2, sm: 3, md: 4, xl: 5 }, display: 'flex',
                           justifyContent: 'flex-end',
                        }}>
                           <CardMedia component="img" image={avatar} sx={{ width: 120 }} />
                        </Box>

                        <Typography
                           variant="h5"
                           sx={{
                              display: 'block',
                              textAlign: 'center',
                              marginTop: '-15px'
                           }}
                        >
                           Stebin Ben
                        </Typography>
                     </Box>
                  </Box>
               </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
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
                     <Box
                        sx={{
                           border: '1px solid rgb(230, 235, 241)',
                           maxWidth: { md: '100vh', xs: 400, lg: '100vh' },
                           margin: { xs: 2.5, md: 3 },
                           '& > *': {
                              flexGrow: 1,
                              flexBasis: '50%'
                           }
                        }}
                     >
                        <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                           <EditProfileForm />
                        </Box>
                     </Box>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Paper>
   </>
);

export default EditProfilePage;
