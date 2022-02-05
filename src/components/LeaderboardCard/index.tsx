import React from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import { Player } from '../../types';
import { useStyles } from './style';

interface Prop {
  items: Player[]
}

const LeaderboardCard = (properties: Prop) => {
  const { items } = properties;
  const styles = useStyles();
  const renderItem = items.map((item: Player, index: number) => {
    return (
      <TableRow className={index % 2 === 0 ? styles.itemEven : styles.itemOdd}>
        <TableCell align="center" className={styles.cellText}>#{index+1}</TableCell>
        <TableCell align="center" className={styles.cellText}>{item.name}</TableCell>
        <TableCell align="center" className={styles.cellText}>{item.score}</TableCell>
      </TableRow>
    )
  })

  return (
    <Grid
      className={styles.leaderboard}
    >
      <Typography
        align="center"
        variant='h3'
        className={styles.leaderboardTitle}>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className={styles.tableHead}>
            <TableCell align="center" className={styles.cellText}>Rank</TableCell>
            <TableCell align="center" className={styles.cellText}>Name</TableCell>
            <TableCell align="center" className={styles.cellText}>Score</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {renderItem}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  )
}

export default LeaderboardCard;
