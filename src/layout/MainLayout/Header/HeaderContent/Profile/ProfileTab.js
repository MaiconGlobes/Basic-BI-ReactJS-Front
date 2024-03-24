import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, Link } from '@mui/material';
import { EditOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';

const ProfileTab = ({ handleLogout }) => {
   const theme = useTheme();

   const [selectedIndex, setSelectedIndex] = useState(0);
   const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
   };

   return (
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
         <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon>
               <UserOutlined />
            </ListItemIcon>
            <ListItemText primary="Ver perfil" />
         </ListItemButton>
         <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon>
               <EditOutlined />
            </ListItemIcon>
            <Link variant="h6" component={RouterLink} to="/edit-profile-page" color="text.primary">
               <ListItemText primary="Editar perfil" />
            </Link>
         </ListItemButton>

         <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
            <ListItemIcon>
               <WalletOutlined />
            </ListItemIcon>
            <ListItemText primary="Cobrança" />
         </ListItemButton>
         <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
            <ListItemIcon>
               <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Sair" />
         </ListItemButton>
      </List>
   );
};

ProfileTab.propTypes = {
   handleLogout: PropTypes.func
};

export default ProfileTab;
