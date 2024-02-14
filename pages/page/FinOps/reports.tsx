import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const tableData = [
    { key: 'Name', value: 'John Doe' },
    { key: 'Age', value: '25' },
    // Add more data as needed
  ];
  return (
    <div>
    <Button style={{    position: "absolute"}} className="absolute bottom-12 right-4" variant="outlined" onClick={handleButtonClick}>
      {isDrawerOpen ? 'Close Close' : 'Open Table'}
    </Button>

    <Drawer anchor="right" open={isDrawerOpen} onClose={handleButtonClick}>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.key}>
                <TableCell>{row.key}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Drawer>
  </div>
);

 

}
export default Dashboard;
