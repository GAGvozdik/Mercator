
// В коде твоего последнего ответа `````` ошибка ``````

import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';

import { createStyles, makeStyles } from '@mui/material/styles'; // Или import { createStyles } from '@mui/styles';

import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
 
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
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';

interface HidingMenuProps {
    children: React.ReactNode;
}

  export default function HidingMenu() {



    const [isTree, setIsTree] = useState(true); 

    
    const [open, setOpen] = React.useState(false);

  
    const [pr, setPr] = useState('WGS84'); // Изначальное значение pr

    const handleListItemClick = (index: string) => {
        setPr(index);
    };

    return (
        <div>

               
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



            

      </List>
  

        </div>
    );
};


    