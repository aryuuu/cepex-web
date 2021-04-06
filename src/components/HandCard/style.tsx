import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  container: {
    alignSelf: 'center',
    position: 'relative',
    height: '60%'
  },
  card: {
    margin: theme.spacing(1),
    width: '40%',
    border: 'solid',
    borderRadius: '5%'
  }
}))
