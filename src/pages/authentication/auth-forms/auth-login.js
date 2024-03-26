import React from 'react';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import instanceAxios from 'axios-config';

const AuthLogin = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
  //  login: '',
   email: '',
   senha: '',
});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, {setErrors, setSubmitting }) => {
   try {
      const response = await instanceAxios.post('/authenticate/login', {
         email: values.email,
         senha: values.senha,
      });
      
      if (response?.data?.retorno?.codigo_status === 98)
      {
         setErrors({ submit: response?.data?.retorno?.mensagem?.descricao });
         return;
      }

      const expires = new Date();
      expires.setDate(expires.getDate() + 365);

      Cookies.set('_hasch_tk', response?.data?.retorno.dados.token, { expires }); 
      navigate('/');
      
   } catch (error) {
      console.log(error);
      setErrors({ submit: error?.response?.data?.retorno?.mensagem?.descricao });
      Cookies.remove('_hasch_tk'); 

   } finally {
      setSubmitting(false);
   }
};

  return (
    <>
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Deve ser um e-mail válido').max(255).required('Email é obrigatório'),
          senha: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(8, 'Senha deve ter no máximo 8 caracteres').required('Senha é obrigatória')
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Endereço de email</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Entre com seu email"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="senha-login">Senha</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-senha-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.senha}
                    name="senha"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle senha visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Entre com sua senha"
                  />
                  {touched.senha && errors.senha && (
                    <FormHelperText error id="standard-weight-helper-text-senha-login">
                      {errors.senha}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Mantenha-me logado</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                  	Esqueceu sua senha?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                  <Grid item xs={12}>
                     <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
               )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  {/* <Typography variant="caption"> Faça login com</Typography> */}
                </Divider>
              </Grid>
              {/* <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
