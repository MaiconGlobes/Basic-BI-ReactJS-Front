import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { NavigationProvider } from './navigation-context'; 

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <NavigationProvider>
        <Routes />
      </NavigationProvider>
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
