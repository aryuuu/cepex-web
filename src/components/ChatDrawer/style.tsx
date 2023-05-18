import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  chat: {
    backgroundColor: '#112633',
    height: '100vh',
    // marginRight: theme.spacing(3)
    padding: theme.spacing(3),
    // maxWidth: '80%',
    overflow: 'hidden',
  },
  drawer: {
    height: '100%',
    // width: '100%',
    padding: theme.spacing(0),
    maxWidth: '80%',
    backgroundColor: '#112633',
  },
  chatList: {
    // height: '50%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(3),
    marginTop: theme.spacing(10)
    // background: 'olive'
  },
  balloon: {
    background: '',
    height: '8%',
    // width: '90%',
    borderRadius: '10px',
    // margin: theme.spacing(1),
    padding: theme.spacing(2),
    color: 'white'
  },
  control: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  },
}))


