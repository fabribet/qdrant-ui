import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export interface ConfirmationDialogProps {
  title: string;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
  confirming?: boolean;
  dangerConfirmation?: boolean;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

/**
 * Used to confirm an action. It will show a prompt for the user to proceed or cancel. If the action
 * is dangerous, the confirm button can be set to red.
 * See https://mui.com/material-ui/react-dialog/#customization
 */
export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { title, text, onClose, onConfirm, confirming, dangerConfirmation } =
    props;
  const handleClose = useCallback(() => !confirming && onClose(), [confirming]);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{text}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={confirming}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            color={dangerConfirmation ? 'error' : undefined}
            disabled={confirming}
            startIcon={
              confirming && (
                <CircularProgress color="inherit" size={15} thickness={2} />
              )
            }
          >
            Proceed
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
