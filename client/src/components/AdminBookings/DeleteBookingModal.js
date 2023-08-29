import React from 'react';
import { Modal, Box, Button } from '@mui/material';

const DeleteBookingModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2 id="delete-modal-title">Confirm Delete</h2>
        <p id="delete-modal-description">
          Are you sure you want to delete this booking?
        </p>
        <Button onClick={() => {
          onConfirm();
          onClose();
        }}>
          Confirm
        </Button>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteBookingModal;
