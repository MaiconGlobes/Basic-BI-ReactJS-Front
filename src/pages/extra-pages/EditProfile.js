import { Typography, CardMedia } from '@mui/material';
import { Divider } from '../../../node_modules/antd/es/index';
import { useState } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgressWithLabel from '../../components/@extended/CircularWithValueLabel';
import avatar from 'assets/images/users/avatar-2.png';
import EditProfileForm from '../authentication/auth-forms/edit-profile';

const EditProfilePage = () => {
   const [disabledForms, setDisabledForms] = useState(true);

   const onHandleClick = () => {
      setDisabledForms(false)
   }

   return (
      <>
         <Paper
            elevation={0}
            sx={{
               padding: '15px',
               background: 'rgb(255, 244, 230)'
            }}
         >
            <Grid
               container
               spacing={2}
               alignItems="center"
               justifyContent="space-between"
            >
               <Grid item xs={12} sm={8}>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                     }}
                  >
                     <CircularProgressWithLabel value={50} />
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
                  <Button
                     fullWidth
                     variant="contained"
                     color="primary"
                     onClick={onHandleClick}
                  >
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
                        // background: 'aqua'
                     }}
                  >
                     <Box>
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
                              p: { xs: 2, sm: 3, md: 4, xl: 5 },
                              display: 'flex',
                              justifyContent: 'center',
                           }}>
                              <CardMedia
                                 component="img"
                                 image={avatar}
                                 sx={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%'
                                 }}
                              />
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
                           <Typography
                              variant="body2"
                              color="secondary"
                              sx={{
                                 display: 'block',
                                 textAlign: 'center',
                              }}
                           >
                              Full Stack Developer
                           </Typography>
                           <Divider />
                           <Grid
                              container
                              spacing={2}
                              colums={3}
                              alignItems="center"
                              justifyContent="center"
                           >
                              <Grid item xs={4} sm={4} md={4} lg={4} >
                                 <Typography
                                    variant="h5"
                                    sx={{
                                       display: 'block',
                                       textAlign: 'center',
                                    }}
                                 >86</Typography>
                                 <Typography
                                    variant="body2"
                                    color="secondary"
                                    sx={{
                                       display: 'block',
                                       textAlign: 'center',
                                    }}
                                 >Posts</Typography>
                              </Grid>
                              <Grid item xs={4} sm={4} md={4} lg={4} >
                                 <Typography
                                    variant="h5"
                                    sx={{
                                       display: 'block',
                                       textAlign: 'center',
                                    }}
                                 >2000</Typography>
                                 <Typography
                                    variant="body2"
                                    color="secondary"
                                    sx={{
                                       display: 'block',
                                       textAlign: 'center',
                                    }}
                                 >Likes</Typography>
                              </Grid>
                              <Grid item xs={4} sm={4} md={4} lg={4} >
                                 <Typography
                                    variant="h5"
                                    sx={{
                                       display: 'block',
                                       textAlign: 'center',
                                    }}
                                 >102</Typography>
                                 <Typography
                                    variant="body2"
                                    color="secondary"
                                    sx={{
                                       display: 'block',
                                       textAlign: 'center',
                                    }}
                                 >Clients</Typography>
                              </Grid>
                           </Grid>

                        </Box>
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgb(230, 235, 241)',
                        gap: 2,
                        // background: 'aqua'
                     }}
                  >
                     <Box>
                        <Box
                           sx={{
                              // border: '1px solid rgb(230, 235, 241)',
                              maxWidth: { md: '100vh', xs: 400, lg: '100vh' },
                              // margin: { xs: 2.5, md: 3 },
                              '& > *': {
                                 flexGrow: 1,
                                 flexBasis: '50%'
                              }
                           }}
                        >
                           <Box
                              sx={{
                                 p: { xs: 2, sm: 3, md: 4, xl: 5 }
                              }}>
                              <EditProfileForm disabledForms={disabledForms} />
                           </Box>
                        </Box>
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </Paper>
      </>
   );
}

export default EditProfilePage;
