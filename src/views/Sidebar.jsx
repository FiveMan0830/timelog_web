import React from 'react'
import {
  Drawer,
  List, 
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Grid,
  FormControl,
  Divider,
  makeStyles,
  Slide
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ReportIcon from '@material-ui/icons/Report';
import TimerIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from 'react-router-dom';
import './Sidebar.css'
import AddLog from './AddLog'
import Duration from './Duration'
import Stopwatch from './Stopwatch'
import { getTeam } from 'actions/Team';
import { connect } from 'react-redux'


const drawerWidth = '15vw';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      height: `calc(100%)`,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },

}));

function Sidebar(props) {
  const classes = useStyles();
  const [logDuration, setLogDuration] = React.useState(3600);
  const [addLogOpen, setAddLogOpen] = React.useState(false);
  const [durationOpen, setDurationOpen] = React.useState(false);
  const [stopwatchOpen, setStopwatchOpen] = React.useState(false);

  const handleAddLogOpen = (logDuration = 3600) => {
    setAddLogOpen(true);
    setLogDuration(logDuration);
  };

  const handleAddLogClose = () => {
    setAddLogOpen(false);
  };

  const handleDurationOpen = () => {
    setDurationOpen(true);
  };

  const handleDurationClose = () => {
    setDurationOpen(false);
  };

  const handleStopwatchOpen = () => {
    setStopwatchOpen(true);
  };

  const handleStopwatchClose = () => {
    setStopwatchOpen(false);
  };

  const history = useHistory();

  const goToBoard = () => {
    history.push("/board")
  };

  const goToHistory = () => {
    history.push("/history")
  };

  const goToTeam = () => {
    console.log(props.groupList[0])
    props.getTeam(props.groupList[0])
    // history.push("/team")
  };

  const goToActivity = () => {
    history.push("/activity")
  };

  const goToTimebox = () => {
    history.push("/timebox")
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
      </div>
      <List>
        <div className="sidebar-button">
          <Slide direction="right" in={true} timeout={{appear:500, enter:500, exit:500}}>
            <ListItem className="sidebar-list">
              <Button startIcon={<AddIcon/>}
                className="sidebar-list-item"
                onClick={handleAddLogOpen}
                variant="contained"
                fullWidth={true}
                color="primary" 
                >
                Add Log
              </Button>
            </ListItem>
          </Slide>
          <Slide direction="right" in={true} timeout={{appear:800, enter:800, exit:800}}>
          <ListItem className="sidebar-list">
              <Button startIcon={<TimerIcon/>}
                className="sidebar-list-item"
                onClick={handleStopwatchOpen}
                variant="contained"
                fullWidth={true}
                color="primary" 
                >
                Stopwatch
              </Button>
            </ListItem>
          </Slide>
          <Slide direction="right" in={true} timeout={{appear:1200, enter:1200, exit:1200}}>
            <ListItem className="sidebar-list">
              <Button startIcon={<AvTimerIcon/>}
                className="sidebar-list-item"
                onClick={handleDurationOpen}
                variant="contained"
                fullWidth={true}
                color="primary" 
                >
                Duration
              </Button>
            </ListItem>
          </Slide>
        </div>
        <Slide direction="right" in={true} timeout={{appear:1200, enter:1200, exit:1200}}>
          <ListItem className="sidebar-list">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <FormControl className="">
                    <DatePicker
                      autoOk
                      label="Start Date"
                      value={ localStorage.getItem("startDate") }
                      format="yyyy/MM/dd"
                      disabled={true}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </ListItem>
        </Slide>
        <Slide direction="right" in={true} timeout={{appear:1200, enter:1200, exit:1200}}>
          <ListItem className="sidebar-list">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <FormControl>
                    <DatePicker
                      autoOk
                      label="End Date"
                      value={ localStorage.getItem("endDate") }
                      format="yyyy/MM/dd"
                      disabled={true}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </ListItem>
        </Slide>
      </List>
      <Divider/>
      <List>
      <Slide direction="right" in={true} timeout={{appear:1500, enter:1500, exit:1500}}>
        <ListItem button key="Board" onClick={goToBoard}>
          <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
          <ListItemText primary="Board" />
        </ListItem>
      </Slide>
      <Slide direction="right" in={true} timeout={{appear:1800, enter:1800, exit:1800}}>
        <ListItem button key="History" onClick={goToHistory}>
          <ListItemIcon>{<HistoryIcon />}</ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
      </Slide>
      <Slide direction="right" in={true} timeout={{appear:2100, enter:2100, exit:2100}}>
        <ListItem button key="Activity" onClick={goToActivity}>
          <ListItemIcon>{<LibraryBooksIcon />}</ListItemIcon>
          <ListItemText primary="Activity" />
        </ListItem>
      </Slide>
      <Slide direction="right" in={true} timeout={{appear:2100, enter:2100, exit:2100}}>
        <ListItem button key="Team" onClick={goToTeam}>
          <ListItemIcon>{<GroupIcon />}</ListItemIcon>
          <ListItemText primary="Team" />
        </ListItem>
      </Slide>
      <Slide direction="right" in={true} timeout={{appear:2400, enter:2400, exit:2400}}>
        <ListItem button key="Timebox" onClick={goToTimebox} style={{display:"none"}}>
          <ListItemIcon>{<TimelapseIcon />}</ListItemIcon>
          <ListItemText primary="Timebox" />
        </ListItem>
      </Slide>
      <Divider style={{margin:'25px 20px'}}/>
      <Slide direction="right" in={true} timeout={{appear:2700, enter:2700, exit:2700}}>
        <a className="report-button" href="https://github.com/software-system-lab/timelog_web/issues" target="_blank" rel="noopener noreferrer">
          <ListItem button key="Report Issue">
            <ListItemIcon>{<ReportIcon color="secondary" />}</ListItemIcon>
            <ListItemText primary="Report Issue" />
          </ListItem>
        </a>
      </Slide>
      </List>
    </div>
  )

  return (
    <nav className={classes.drawer}>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
      <AddLog className="AddLog" duration={logDuration} open={addLogOpen} handleClose={handleAddLogClose}/>
      <Duration className="Duration" open={durationOpen} handleClose={handleDurationClose} startDate={props.startDate} endDate={props.endDate} updateDates={props.updateDates}/>
      <Stopwatch className="Stopwatch" open={stopwatchOpen} handleClose={handleStopwatchClose} openAddLogDialog={handleAddLogOpen} />
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    groupList: state.groupList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTeam: (groupname, token) => {
      dispatch(getTeam(groupname, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
