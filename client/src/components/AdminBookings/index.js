import React, { useEffect, useState } from 'react';
import { Paper, Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './AdminBookings.css'; // Import your custom CSS file

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [openCollapseId, setOpenCollapseId] = useState(null);

  useEffect(() => {
    // Fetch bookings from the API
    fetch('/api/bookings')
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleSort = (column) => {
    if (sortConfig.key === column) {
      setSortConfig({
        key: column,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key: column, direction: 'asc' });
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    if (sortConfig.key !== null) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const toggleCollapse = (bookingId) => {
    if (openCollapseId === bookingId) {
      setOpenCollapseId(null);
    } else {
      setOpenCollapseId(bookingId);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>

      <TableContainer className="custom-table-container">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{color: 'whitesmoke'}} onClick={() => handleSort('name')}>Name</TableCell>
              <TableCell style={{color: 'whitesmoke'}} align="left" onClick={() => handleSort('email')}>
                Email
              </TableCell>
              <TableCell style={{color: 'whitesmoke'}} align="left" onClick={() => handleSort('date')}>
                Date
              </TableCell>
              <TableCell style={{color: 'whitesmoke'}} align="left" onClick={() => handleSort('hours')}>
                Hour Block
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBookings.map((booking, index) => (
              <React.Fragment key={booking._id}>
                <TableRow className={index === sortedBookings.length - 1 ? 'last-row' : 'table-row'}>
                  <TableCell>
                    <IconButton
                      aria-label="toggle-collapse"
                      size="small"
                      onClick={() => toggleCollapse(booking._id)}
                    >
                      {openCollapseId === booking._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell style={{color: 'whitesmoke'}}>{booking.name}</TableCell>
                  <TableCell style={{color: 'whitesmoke'}} align="left">{booking.email}</TableCell>
                  <TableCell style={{color: 'whitesmoke'}} align="left">{booking.date}</TableCell>
                  <TableCell style={{color: 'whitesmoke'}} align="left">{booking.hours}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: 'whitesmoke', paddingBottom: '0', paddingTop: '0', border: 'none'}} colSpan={3}>
                    <Collapse in={openCollapseId === booking._id}>
                      <div  style={{padding: '1em'}} >
                        <Typography variant="body1">Name: {booking.name}</Typography>
                        {/* Add more data fields here */}
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminBookings;
