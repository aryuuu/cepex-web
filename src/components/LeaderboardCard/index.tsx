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
      <TableRow>
        <TableCell align="center">#{index+1}</TableCell>
        <TableCell align="center">{item.name}</TableCell>
        <TableCell align="center">{item.score}</TableCell>
      </TableRow>
    )
  })

  return (
    <Grid
      className={styles.leaderboard}
    >
      <Typography align="center">Leaderboard</Typography>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Score</TableCell>
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
