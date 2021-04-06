import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  chatList: {
    height: '70%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(3)
    // background: 'olive'
  },
  balloon: {
    background: 'grey',
    height: '8%',
    width: '90%',
    borderRadius: '10px',
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  }
}))
