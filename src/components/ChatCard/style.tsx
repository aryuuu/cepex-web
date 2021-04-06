import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  chatCont: {
    height: '80%',
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // background: 'olive'
  },
  balloon: {
    background: 'grey',
    height: '8%',
    width: '90%',
    borderRadius: '10px',
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}))
