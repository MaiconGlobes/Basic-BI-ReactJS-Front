import * as Yup from 'yup';
import { Formik } from 'formik';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
   Box,
   Button,
   FormControl,
   FormHelperText,
   Grid,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
   Stack,
   Typography
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Cookies from 'js-cookie';
import instanceAxios from 'axios-config';

const EditProfileForm = () => {
   const navigate = useNavigate();
   const [level] = useState();
   const [showPassword, setShowPassword] = useState(false);
   const [formValues, setFormValues] = useState({
      fullname: '',
      email: '',
      document: '',
      password: '',
      phone: '',
      addrees: '',
      number: '',
      neighborhood: '',
      county: '',
      uf : '',
      cep: '',
   });

   const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleSubmit = async (values, { setErrors, setSubmitting }) => {
      try {
         const response = await instanceAxios.post('/user/edit', {
            login: values.surname,
            email: values.email,
            senha: values.password,
            pessoa: {
               nome: values.fullname,
               cpf_cnpj: values.document,
            },
         });
         const expires = new Date();
         expires.setDate(expires.getDate() + 365);

         Cookies.set('_hasch_tk', response?.data?.retorno.dados.token, { expires });
         navigate('/');
      } catch (error) {
         setErrors({ submit: error?.response?.data?.retorno?.mensagem?.descricao });
         //Cookies.remove('_hasch_tk');
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <>
         <Formik
            initialValues={formValues}
            validationSchema={Yup.object().shape({
               fullname: Yup.string().max(50, 'Deve conter no máximo 50 caracteres').required('Nome é obrigatório'),
               document: Yup.string().matches(/^\d+$/, 'Apenas números são permitidos').min(11, 'Deve conter no mínimo 11 caracteres').max(14, 'Deve conter no máximo 14 caracteres').required('CPF/CNPJ é obrigatório'),
               email: Yup.string().email('Must be a valid email').max(255).required('Email é obrigatório'),
               password: Yup.string().min(6, 'Deve conter no mínimo 6 caracteres').max(8, 'Deve conter no máximo 8 caracteres').required('Senha é obrigatória'),
               phone: Yup.string().matches(/^\d+$/, 'Apenas números são permitidos').min(10, 'Deve conter no mínimo 10 caracteres').max(11, 'Deve conter no máximo 11 caracteres'),
               addrees: Yup.string().max(100, 'Deve conter no máximo 100 caracteres'),
               number: Yup.string().max(10, 'Deve conter no máximo 10 caracteres'),
               neighborhood: Yup.string().max(35, 'Deve conter no máximo 35 caracteres'),
               county: Yup.string().max(100, 'Deve conter no máximo 100 caracteres'),
               uf : Yup.string().max(2, 'Deve conter no máximo 2 caracteres'),
               cep: Yup.string().matches(/^\d+$/, 'Apenas números são permitidos').max(8, 'Deve conter no máximo 8 caracteres'),
            })}
            onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
               setFormValues(values);
               handleSubmit(values, { setErrors, setStatus, setSubmitting });
            }}
            onInputChange={(e) => {
               console.log(e);
               const { name, value } = e.target;
               setFormValues((prevValues) => ({
                  ...prevValues,
                  [name]: value,
               }));
            }}
         >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
               <form noValidate onSubmit={handleSubmit}>
                  <Typography
                     variant="h5"
                     sx={{
                        display: 'block',
                        marginBottom: 2
                     }}
                  >
                     Basico
                  </Typography>
                  <Grid container spacing={2}>

                     <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="fullname-signup">Nome completo</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.fullname && errors.fullname)}
                              id="fullname-signup"
                              type="fullname"
                              value={values.fullname}
                              name="fullname"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu nome legítimo"
                              inputProps={{}}
                           />
                           {touched.fullname && errors.fullname && (
                              <FormHelperText error id="helper-text-fullname-signup">
                                 {errors.fullname}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="document-signup">CPF/CNPJ</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.document && errors.document)}
                              id="document-signup"
                              value={values.document}
                              name="document"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu documento ou da companhia"
                              inputProps={{}}
                           />
                           {touched.document && errors.document && (
                              <FormHelperText error id="helper-text-document-signup">
                                 {errors.document}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={8}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="email-signup">Endereço de email</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.email && errors.email)}
                              id="email-login"
                              type="email"
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu melhor email"
                              inputProps={{}}
                           />
                           {touched.email && errors.email && (
                              <FormHelperText error id="helper-text-email-signup">
                                 {errors.email}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={4}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="fullname-signup">Telefone</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.phone && errors.phone)}
                              id="phone-signup"
                              type="tel"
                              value={values.phone}
                              name="phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu telefone"
                              inputProps={{}}
                           />
                           {touched.phone && errors.phone && (
                              <FormHelperText error id="helper-text-phone-signup">
                                 {errors.phone}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="password-signup">Senha</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.password && errors.password)}
                              id="password-signup"
                              type={showPassword ? 'text' : 'password'}
                              value={values.password}
                              name="password"
                              onBlur={handleBlur}
                              onChange={(e) => {
                                 handleChange(e);
                              }}
                              endAdornment={
                                 <InputAdornment position="end">
                                    <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={handleClickShowPassword}
                                       onMouseDown={handleMouseDownPassword}
                                       edge="end"
                                       size="large"
                                    >
                                       {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </IconButton>
                                 </InputAdornment>
                              }
                              placeholder="******"
                              inputProps={{}}
                           />
                           {touched.password && errors.password && (
                              <FormHelperText error id="helper-text-password-signup">
                                 {errors.password}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={6}></Grid>

                     <Grid item xs={12}>

                        <Typography
                           variant="h5"
                           sx={{
                              display: 'block',
                              marginTop: 2,
                           }}
                        >
                           Endereço
                        </Typography>
                     </Grid>

                     <Grid item xs={12} sm={9}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="addrees-signup">Endereço</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.fullname && errors.addrees)}
                              id="addrees-signup"
                              type="text"
                              value={values.addrees}
                              name="addrees"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu endereço"
                              inputProps={{}}
                           />
                           {touched.addrees && errors.addrees && (
                              <FormHelperText error id="helper-text-fuaddreesllname-signup">
                                 {errors.addrees}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={3}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="number-signup">Numero</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.number && errors.number)}
                              id="number-signup"
                              type="text"
                              value={values.number}
                              name="number"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Número ou S/N"
                              inputProps={{}}
                           />
                           {touched.number && errors.number && (
                              <FormHelperText error id="helper-text-number-signup">
                                 {errors.number}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={5}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="neighborhood-signup">Bairro</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.neighborhood && errors.neighborhood)}
                              id="neighborhood-signup"
                              type="neighborhood"
                              value={values.neighborhood}
                              name="neighborhood"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu bairro"
                              inputProps={{}}
                           />
                           {touched.neighborhood && errors.neighborhood && (
                              <FormHelperText error id="helper-text-neighborhood-signup">
                                 {errors.neighborhood}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={5}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="county-signup">Município</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.county && errors.county)}
                              id="county-signup"
                              type="county"
                              value={values.county}
                              name="county"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu município"
                              inputProps={{}}
                           />
                           {touched.county && errors.county && (
                              <FormHelperText error id="helper-text-county-signup">
                                 {errors.county}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <Grid item xs={12} sm={2}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="uf-signup">UF</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.uf && errors.uf)}
                              id="uf-signup"
                              type="text"
                              value={values.uf}
                              name="uf"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu estado"
                              inputProps={{}}
                           />
                           {touched.uf && errors.uf && (
                              <FormHelperText error id="helper-text-uf-signup">
                                 {errors.uf}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>
                     <Grid item xs={12} sm={4}>
                        <Stack spacing={1}>
                           <InputLabel htmlFor="cep-signup">CEP</InputLabel>
                           <OutlinedInput
                              fullWidth
                              error={Boolean(touched.cep && errors.cep)}
                              id="cep-signup"
                              type="tel"
                              value={values.cep}
                              name="cep"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder="Seu código postal"
                              inputProps={{}}
                           />
                           {touched.cep && errors.cep && (
                              <FormHelperText error id="helper-text-cep-signup">
                                 {errors.cep}
                              </FormHelperText>
                           )}
                        </Stack>
                     </Grid>

                     <FormControl fullWidth sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                           <Grid item>
                              <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                           </Grid>
                           <Grid item>
                              <Typography variant="subtitle1" fontSize="0.85rem">
                                 {level?.label}
                              </Typography>
                           </Grid>
                        </Grid>
                     </FormControl>
                     {errors.submit && (
                        <Grid item xs={12} sm={6}>
                           <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                     )}
                     <Grid item xs={12} sm={12}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end' }}>
                           <AnimateButton>
                              <Button disableElevation disabled={isSubmitting} size="medium" type="submit" variant="contained" color="primary">
                                 Atualizar
                              </Button>
                           </AnimateButton>
                        </Box>
                     </Grid>
                  </Grid>
               </form>
            )}
         </Formik>
      </>
   );
};

export default EditProfileForm;
