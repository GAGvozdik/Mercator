import React, {useEffect} from 'react';

// import Header from '../src/components/header'
import MainMap from './components/projections/map';
// import BasicSimpleTreeView from './components/catalog/catalog';
import LambConic from './components/projections/lambCone';
import SideMenu from './components/sideMenu/SideMenu';




// import {  MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import { Map } from 'react-leaflet';


 
// import RectangleIcon from '@mui/icons-material/Rectangle';
// import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';



// import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
// import FolderIcon from '@mui/icons-material/Folder';
import { useState } from 'react';
// import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import styles from './App.module.scss';

function App() {


  const [pr, setPr] = useState("Lambert Conic"); // Изначальное значение pr
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const onProjectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPr((event.target as HTMLInputElement).value);
  };
  
  const [open, setOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={styles.root}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        className={styles.appBar}
        sx={{ 
          backgroundColor: isDarkTheme 
            ? 'rgba(var(--accent-secondary))' 
            : 'rgba(var(--accent-primary))' 
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle menu"
            onClick={handleMenuToggle}
            edge="start"
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontFamily: 'MyRuda, sans-serif' }}>
            WGS84 to Lambert conic
          </Typography>
          <IconButton color="inherit" onClick={handleThemeChange}>
            {isDarkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      <SideMenu 
        open={open}
        projection={pr}
        onProjectionChange={onProjectionChange}
        onClose={handleMenuToggle}
      />

      <main className={styles.content}>
        <div className={styles.toolbar} />
        

        {pr == 'WGS84' ? (

          <div style={{flexGrow: 1}}>
            <MainMap />  
          </div>

        ) : (
          
          <div>
                <div style={{flexGrow: 1}}>
                  <LambConic />
                </div>
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;






