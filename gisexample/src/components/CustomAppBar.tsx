import React, { useRef, useEffect, useState } from 'react';
// import * as d3 from 'd3';
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
import HidingMenu from '../components/HidingMenu';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';

import { Theme, createTheme, ThemeProvider, useTheme} from '@mui/material/styles';
 

const drawerWidth: number = 350;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  children: React.ReactNode;
}


const AppBar = styled(
    MuiAppBar, 
    {shouldForwardProp: (prop) => prop !== 'open',}
)<AppBarProps>(({ theme, open }) => ({
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



const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});


const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create(
        'width', 
        {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: 
        {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
});



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


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));


const CustomAppBar: React.FC<AppBarProps> = ({ children }) => {
    

    const [isTree, setIsTree] = useState(true); 

    const theme = useTheme();
    const handleDrawerClose = () => {
        setIsTree(true);
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
        
    };
    
    return (
        <div>
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
                            Name of App
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

                    <HidingMenu />

                </Drawer>

                <Box component="main" >
                    <>
                        <DrawerHeader></DrawerHeader>
                        {children}
                    </>
                </Box>

            </Box>
        </div>
    );
};

export default CustomAppBar;