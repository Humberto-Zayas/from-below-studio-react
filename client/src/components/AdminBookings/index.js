import React, { useEffect, useState } from 'react';
import { Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, ListItem, ListItemText } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
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

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (response.ok) {
        // Update the local state with the updated booking
        const updatedBookings = bookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        );
        setBookings(updatedBookings);
      } else {
        console.error('Error updating booking status:', response.statusText);
        alert('An error occurred while updating the booking status.');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('An error occurred while updating the booking status.');
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
              <TableCell style={{ color: 'whitesmoke' }} onClick={() => handleSort('name')}>Name</TableCell>
              <TableCell style={{ color: 'whitesmoke' }} align="left" onClick={() => handleSort('email')}>
                Email
              </TableCell>
              <TableCell style={{ color: 'whitesmoke' }} align="left" onClick={() => handleSort('date')}>
                Date
              </TableCell>
              <TableCell style={{ color: 'whitesmoke' }} align="left" onClick={() => handleSort('hours')}>
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
                  <TableCell style={{ color: 'whitesmoke' }}>{booking.name}</TableCell>
                  <TableCell style={{ color: 'whitesmoke' }} align="left">{booking.email}</TableCell>
                  <TableCell style={{ color: 'whitesmoke' }} align="left">{booking.date}</TableCell>
                  <TableCell style={{ color: 'whitesmoke' }} align="left">{booking.hours}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: 'whitesmoke', paddingBottom: '0', paddingTop: '0', border: 'none' }} colSpan={5}>
                    <Collapse in={openCollapseId === booking._id}>
                      <div style={{ padding: '1em 0', width: '100%' }}>
                        <ListItem>
                          <ListItemText
                            style={{ maxWidth: '120px' }}
                            primary={
                              <>
                                <Typography>Phone: </Typography>
                                <Typography>{`${booking.phoneNumber}`}</Typography>
                              </>
                            }
                          />
                          <ListItemText
                            style={{ maxWidth: '400px' }}
                            primary={
                              <>
                                <Typography>Customer Message: </Typography>
                                <Typography>{`${booking.message}`}</Typography>
                              </>
                            } />
                          <div>
                            <Button
                              onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                              variant="transparent"
                              color="success"
                              startIcon={<CheckIcon />}
                            >
                              Confirm
                            </Button>
                            <Button
                              onClick={() => handleUpdateStatus(booking._id, 'denied')}
                              variant="transparent"
                              color="error"
                              startIcon={<ClearIcon />}
                            >
                              Deny
                            </Button>
                          </div>
                        </ListItem>
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
