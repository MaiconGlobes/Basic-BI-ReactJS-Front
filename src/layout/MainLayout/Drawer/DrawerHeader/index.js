import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';

const DrawerHeader = ({ open }) => {
   const theme = useTheme();

   return (
      <DrawerHeaderStyled theme={theme} open={open}>
         <Stack direction="row" spacing={1} alignItems="center">
            <Logo />
            <Chip
               label={process.env.REACT_APP_VERSION}
               size="small"
               sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
               component="a"
               href="https://github.com/codedthemes/mantis-alowders-react-admin-template"
               target="_blank"
               clickable
            />
         </Stack>
      </DrawerHeaderStyled>
   );
};

DrawerHeader.propTypes = {
   open: PropTypes.bool
};

export default DrawerHeader;
