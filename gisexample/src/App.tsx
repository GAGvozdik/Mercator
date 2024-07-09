import React, {useEffect} from 'react';
import './App.css';
// import Header from '../src/components/header'
import MainMap from '../src/components/map';
import BasicSimpleTreeView from '../src/components/catalog';
import MapWithPolygons from './components/oceanMapWGS';
import LambConic from './components/lambCone';
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
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import { useState } from 'react';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import FileUploadComponent from '../src/components/loader';


import { Provider } from 'react-redux';
import store from './redux/store';


const drawerWidth = 350;

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

    <div className="App" >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Box>

      <AppBar position="fixed" open={open} style={{ backgroundColor: '#318DC2' }}>
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
      
    <Drawer
      variant="permanent"
      open={open}
    >

        <DrawerHeader >
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
    
        <CircleOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={'Lambert Conic'} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>

  
  <ListItem key={'WGS84'} disablePadding>
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
        
       <RectangleOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={'WGS84'} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>


  <ListItem key={'Lambert Conic Zone'} disablePadding sx={{ display: 'block' }}>
    <ListItemButton
    onClick={() => handleListItemClick('Lambert Conic Zone')} // Добавляем обработчик клика
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


  <ListItem key={'Catalog'} disablePadding sx={{ display: 'block' }} >
  
    <Divider />

    {isTree == false ? <BasicSimpleTreeView /> : 
          <> 
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
            </ListItemButton>
          </>
        }

  </ListItem>

<Divider />
</List>


      </Drawer>
      <Box component="main" >
        <DrawerHeader/>
        

        {pr == 'WGS84' ? (

          <div>
            <MainMap />  
            {/* <IndexPage /> */}
          </div>

        ) : (
          
          <div>
            { pr == 'Lambert Conic' ? (
                <div>
                  <LambConic />
                </div>
              ) : (
                <div>
                  {/* <MapWithPolygons />  */}
                  <FileUploadComponent />
                </div>
              )
            } 
            
          </div>
        )}
        
      </Box>
    </Box>

      </ThemeProvider>

    </Provider>
    </div>
  );
}

export default App;





