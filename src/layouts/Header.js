import React from 'react';
import './css/header.css';

import { Link as Linkto } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MailIcon from '@material-ui/icons/Mail';
import MovieIcon from '@material-ui/icons/Movie';
import TocIcon from '@material-ui/icons/Toc';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: 'black'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const ToLogin = (e) => {
        history.push("/login")
    }
    const Logout = e => {
        localStorage.removeItem("login");
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className="test"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon style={{ color: "white" }} />
                    </IconButton>
                    <Typography variant="h7" noWrap style={{}}>
                        AYAMBERKOKOK
          </Typography>
                    <Typography variant="h8" style={{ marginLeft: "80%", float: "right", color: "white", fontWeight: "bold", cursor: "pointer" }} onClick={ToLogin} >
                        {localStorage.getItem("login") === null &&
                            <>
                                Login<ExitToAppIcon style={{ color: "gold" }} />
                            </>
                        }
                        {localStorage.getItem("login") !== null &&
                            <>
                                Halo {localStorage.login}
                            </>
                        }
                    </Typography>

                </Toolbar>
            </AppBar>
            <Drawer

                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader} >
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ color: "black" }} /> : <ChevronRightIcon style={{ color: "black" }} />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem >
                        <ListItemIcon><HomeIcon style={{ color: "black" }} /></ListItemIcon>
                        <ListItemText><Linkto to="/" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}> Home</Linkto></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem >
                        <ListItemIcon><MovieIcon style={{ color: "black" }} /></ListItemIcon>
                        <ListItemText><Linkto to="/movie" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>Movie List</Linkto></ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListItem >
                        <ListItemIcon><SportsEsportsIcon style={{ color: "black" }} /></ListItemIcon>
                        <ListItemText><Linkto to="/game" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>Game List</Linkto></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem >
                        <ListItemIcon><TocIcon style={{ color: "black" }} /></ListItemIcon>
                        <ListItemText><Linkto to="/movie/tablemovie" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>Table Movie</Linkto></ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListItem >
                        <ListItemIcon><TocIcon style={{ color: "black" }} /></ListItemIcon>
                        <ListItemText><Linkto to="/game/tablegame" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>Table Game</Linkto></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {localStorage.getItem("login") !== null &&
                        <ListItem >
                            <ListItemIcon><ExitToAppIcon style={{ color: "black" }} /></ListItemIcon>
                            <ListItemText onClick={Logout} style={{ cursor: "pointer" }}>Logout</ListItemText>
                        </ListItem>
                    }
                </List>
            </Drawer>
        </div >
    );
}
