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
	Link,
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

const AuthRegister = () => {
	const navigate = useNavigate();
	const [level] = useState();
	const [showPassword, setShowPassword] = useState(false);
	const [formValues, setFormValues] = useState({
		fullname: '',
		email: '',
		document: '',
		password: '',
	});

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = async (values, {setErrors, setSubmitting }) => {
		try {
			const response = await instanceAxios.post('/authenticate/register', {
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
					fullname: Yup.string().max(50, 'Deve conter no máximo 50 caracteres').required('Nome é obrigatório'),
					document: Yup.string().matches(/^\d+$/, 'Apenas números são permitidos').min(11, 'Deve conter no mínimo 11 caracteres').max(14, 'Deve conter no máximo 14 caracteres').required('CPF/CNPJ é obrigatório'),
					email: Yup.string().email('Must be a valid email').max(255).required('Email é obrigatório'),
					password: Yup.string().min(6, 'Deve conter no mínimo 6 caracteres').max(8, 'Deve conter no máximo 8 caracteres').required('Senha é obrigatória')
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
							<Grid item xs={12}>
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
							<Grid item xs={12}>
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
							<Grid item xs={12}>
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
								<FormControl fullWidth sx={{ mt: 2 }}>
									<Grid container spacing={2} alignItems="center">
										<Grid item>
											<Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
										</Grid>
										<Grid item>
											<Typography variant="subtitle1" fontSize="0.75rem">
												{level?.label}
											</Typography>
										</Grid>
									</Grid>
								</FormControl>
							{errors.submit && (
								<Grid item xs={12}>
									<FormHelperText error>{errors.submit}</FormHelperText>
								</Grid>
							)}
							</Grid>
							<Grid item xs={12}>
								<Typography variant="body2">
									Ao se inscrever você concorda com nossos &nbsp;
									<Link variant="subtitle2" component={RouterLink} to="#">
										Termos de serviço
									</Link>
									&nbsp; and &nbsp;
									<Link variant="subtitle2" component={RouterLink} to="#">
										Política de Privacidade
									</Link>
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<AnimateButton>
									<Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
										Criar conta
									</Button>
								</AnimateButton>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</>
	);
};

export default AuthRegister;
