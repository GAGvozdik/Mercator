import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../src/components/header'
import MainMap from '../src/components/map'
import IndexPage from '../src/components/rasterMap'
import BasicSimpleTreeView from '../src/components/catalog'
import MapWithPolygons from '../src/components/MapWithPolygons'
import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';

import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
import theme from '../src/components/theme'; 

import {  MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// import { Map } from 'react-leaflet';
import './App.css';

 
import RectangleIcon from '@mui/icons-material/Rectangle';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';


import { styled, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FolderIcon from '@mui/icons-material/Folder';
import { useState } from 'react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBar = styled(MuiAppBar, 
  {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function App() {


  const [pr, setPr] = useState('WGS84'); // Изначальное значение pr

  const handleListItemClick = (index: string) => {
    setPr(index);
  };
  

  const [isTree, setIsTree] = useState(true); 




  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    
  };

  const handleDrawerClose = () => {
    setIsTree(true);
    setOpen(false);
    

  };

  return (


    <div className="App">

      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>

      <AppBar theme={theme} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            WGS84 to Lambert conic
          </Typography>
        </Toolbar>
      </AppBar>

      
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />


        <List>
          {/* ['Lambert Conic', 'WGS84', 'Catalog'] */}
            
            <ListItem key={'Lambert Conic'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={() => handleListItemClick('Lambert Conic')} // Добавляем обработчик клика
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  
                  <ChangeHistoryIcon />
                </ListItemIcon>
                <ListItemText primary={'Lambert Conic'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
         
            
            <ListItem key={'WGS84'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={() => handleListItemClick('WGS84')} // Добавляем обработчик клика
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  
                 <RectangleIcon />
                </ListItemIcon>
                <ListItemText primary={'WGS84'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
         
            
            {/* <ListItem key={'Catalog'} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={() => setIsTree(!isTree)} // Добавляем обработчик клика
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  
                  <FolderIcon onClick={handleDrawerOpen}/>
                </ListItemIcon>
                <ListItemText primary={'Catalog'} sx={{ opacity: open ? 1 : 0 }} />
                
              </ListItemButton>
            </ListItem> */}
         

            {isTree == false ? <BasicSimpleTreeView /> : <></>}




        </List>



        


        <Divider />

      </Drawer>
      <Box component="main">
        <DrawerHeader />
        

        {/* <MainMap theme={theme} /> */}

        {pr == 'WGS84' ? (

          <div>
          {/* <MapWithPolygons /> */}
          <IndexPage />
          </div>

        ) : (

          <div>
           <MainMap theme={theme} pr={pr} />           
                      
          </div>

        )}
        
      </Box>
    </Box>

      </ThemeProvider>
    </div>
  );
}

export default App;






