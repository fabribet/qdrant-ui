import { styled } from '@mui/material/styles';
import { Box, TableCell, tableCellClasses, TableRow } from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PreviewOutlined,
} from '@mui/icons-material/';

export const HoveringDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
`;

export const HoveringEditIcon = styled(EditIcon)`
  cursor: pointer;
`;

export const HoveringPreviewIcon = styled(PreviewOutlined)`
  cursor: pointer;
`;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&.actions': {
    width: '120px',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ActionsContainer = styled(Box)``;
