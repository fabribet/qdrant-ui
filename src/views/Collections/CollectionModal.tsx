import { Box, Button, DialogActions, Modal, Typography } from '@mui/material';
import React from 'react';

interface CollectionModalProps {
  onClose: () => void;
  onSubmit?: () => void;
  submitButtonText?: string;
  disableSubmit?: boolean;
  title: string;
  children: React.ReactNode;
  columns?: 1 | 2;
}

const getModalBoxStyle = (columns: 1 | 2) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: columns === 1 ? 400 : 650,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '90%',
});

export default function CollectionModal({
  onClose,
  onSubmit,
  disableSubmit = false,
  submitButtonText = 'Save',
  columns = 1,
  title,
  children,
}: CollectionModalProps) {
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={getModalBoxStyle(columns)}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          style={{ marginBottom: 40 }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 10 }}>
          {columns === 1 ? (
            <Box
              sx={{
                maxWidth: 180,
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              {children}
            </Box>
          ) : (
            children
          )}
        </Box>
        {/* Only if submit is provided the modal should have actions */}
        {!!onSubmit && (
          <DialogActions sx={{ marginTop: '15px' }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} disabled={disableSubmit}>
              {submitButtonText}
            </Button>
          </DialogActions>
        )}
      </Box>
    </Modal>
  );
}
