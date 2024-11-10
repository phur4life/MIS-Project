import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';

const StatusButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: 'white',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const RequestTable = () => {
  const rows = Array(15).fill({
    serviceName: 'Fixing Bulb',
    block: 'HB',
    room: '201',
    date: '02/09/2024',
    status: 'Completed',
  });

  return (
    <Paper elevation={3} sx={{ padding: 2, width: '80vw', height: '100vh', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Request
      </Typography>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ff9800', color: 'white' }}>
                Service Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ff9800', color: 'white' }}>
                Block
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ff9800', color: 'white' }}>
                Room
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ff9800', color: 'white' }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ff9800', color: 'white' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{row.serviceName}</TableCell>
                <TableCell>{row.block}</TableCell>
                <TableCell>{row.room}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <StatusButton variant="contained">{row.status}</StatusButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RequestTable;
