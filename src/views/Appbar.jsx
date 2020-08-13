import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles} from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import './Appbar.css';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import PopoverProfile from './PopoverProfile';
import { useState } from 'react';
import { readableCounter } from "../utils";
import useAnimationFrame from "../useAnimationFrame";
import { connect } from 'react-redux';
import "./Stopwatch.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100%)`,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  iconColor: {
    color: '#fff' ,
    backgroundColor: '#00C6CF' ,
  },
  toolbar: theme.mixins.toolbar,
}));

function Appbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [time, setTime] = useState(0);
  const [startTimer, stopTimer] = useAnimationFrame(delta =>
    setTime(prevTime => prevTime + delta / 1000)
    );
    
  const stopAndReset = () => {
    stopTimer();
    setTime(0);
  }

  const handleDrawerToggle = () => {
    props.handleDrawerToggle();
  };

  const goToWelcome = () => {
    history.push("/welcome")
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const displayName = localStorage.getItem("displayName");
  
  return (
    <AppBar position="fixed" className={classes.appBar} style={{background:'#303030'}}>
      <Toolbar style={{justifyContent:'space-between'}}> 
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
        <MenuIcon />
        </IconButton>
        <div className="appbar-LOGO">
          <img src="TIME_LOG.png" alt="TIMELOG" onClick={ ()=>{ goToWelcome(); startTimer();} }>
          </img>
        </div>
        <div className="timer-bar">
          <h1 className="timer-header">{props.timeString}</h1>
        </div>
        <div className="profile-btn" >
          <Avatar className={classes.iconColor}  alt={displayName} src="/broken-image.jpg" onClick={handleClick} id="profile-icon"/>
          <Popover
            open={Boolean(anchorEl)}
            margin='100px'
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            style={{
              width: '150%',
              height: '150%',
            }}
          >
            <PopoverProfile></PopoverProfile>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  )
}

function mapStateToProps(state) {
  return {
    timeString: state.stopWatchTime
  }
}

export default connect(mapStateToProps, null)(Appbar)
