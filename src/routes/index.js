import { useRoutes } from 'react-router-dom';
import LoginRoutes from './login-routes';
import MainRoutes from './main-routes';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, LoginRoutes]);
}
