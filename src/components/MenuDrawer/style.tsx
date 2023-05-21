import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(8),
    height: theme.spacing(10),
    width: theme.spacing(10),
    border: "solid"
  },
  drawer: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(0),
    backgroundColor: '#112633'
  },
  control: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
}))

