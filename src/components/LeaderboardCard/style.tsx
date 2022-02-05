import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  leaderboard: {
    height: '70%',
    width: '50%',
    alignContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(50%, 20%)',
    backgroundColor: '#2e3440',
    padding: theme.spacing(1)
  },
  itemList: {
    height: '100%',
    width: '100%',
  },
  leaderboardTitle: {
    color: '#eceff4',
  },
  tableHead: {
    backgroundColor: '#434c5e',
    color: '#eceff4'
  },
  itemOdd: {
    background: '#4c566a',
    color: '#eceff4'
  },
  itemEven: {
    background: '#3b4252',
    color: '#eceff4'
  },
  cellText: {
    color: '#eceff4'
  }
}))
