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

import Graph from './components/Graph';
import CustomAppBar from './components/CustomAppBar';

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

      <ThemeProvider theme={theme}>
     
      <CustomAppBar>
          

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
                <MapWithPolygons /> 
              </div>
            )
          } 
          
        </div>
        )}
      </CustomAppBar>


      </ThemeProvider>
    </div>
  );
}

export default App;






