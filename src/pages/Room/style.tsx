import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(8),
    height: theme.spacing(12),
    width: theme.spacing(12),
    border: "solid"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  confirm: {
    margin: theme.spacing(3, 0, 2)
  },
  profile: {
    margin: theme.spacing(0),
    height: '100vh',
    // background: 'pink'
  },
  mid: {
    height: '100vh'
  },
  table: {
    height: '65vh'
  },
  lastPlayedDisplay: {
    height: '20vh',
  },
  card: {
    // width: '10%',
    height: '100%',
    border: 'solid',
    borderRadius: '5%',
    background: 'white'
    // position: 'relative'
  },
  room: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(0),
    backgroundColor: '#112633'
  },
  chat: {
    // background: 'violet',
    height: '100vh',
    // marginRight: theme.spacing(3)
    padding: theme.spacing(3),
    overflow: 'hidden'
  },
  roomCont: {
    padding: theme.spacing(0),
    width: '100%',
    maxWidth: '95%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 100
  },
  control: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  container: {
    backgroundColor: '#112633'
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  },
  roomBackdrop: {
    // backgroundColor: "pink",
    color: "white",
    fontSize: "32px",
    zIndex: 0
    // opacity: 'opacity'
  }
}));
