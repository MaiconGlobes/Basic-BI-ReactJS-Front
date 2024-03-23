import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
      navigate(path);
  };

  return (
      <NavigationContext.Provider value={{ navigate: handleNavigate }}>
         {children}
      </NavigationContext.Provider>
  );
};

export const handleNavigate = (path) => {};
