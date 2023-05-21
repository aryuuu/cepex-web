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
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  },
}))


