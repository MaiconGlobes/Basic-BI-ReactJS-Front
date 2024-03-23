import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { NavigationProvider } from './NavigationContext'; 

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
