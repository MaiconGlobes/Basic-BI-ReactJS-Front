import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LockOutlined, QuestionCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

const SettingTab = () => {
   const theme = useTheme();

   const [selectedIndex, setSelectedIndex] = useState(0);
   const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
   };

   return (
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
         <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemIcon>
               <LockOutlined />
            </ListItemIcon>
            <ListItemText primary="Configurações do sistema" />
         </ListItemButton>
         <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
            <ListItemIcon>
               <UnorderedListOutlined />
            </ListItemIcon>
            <ListItemText primary="Histórico" />
         </ListItemButton>
         <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemIcon>
               <QuestionCircleOutlined />
            </ListItemIcon>
            <ListItemText primary="Suporte" />
         </ListItemButton>
      </List>
   );
};

export default SettingTab;
