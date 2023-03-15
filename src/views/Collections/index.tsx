import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  AddCircleOutlineOutlined,
} from '@mui/icons-material/';
import { styled } from '@mui/material/styles';

import CollectionsAPI from '../../api';
import { CollectionData, CollectionName } from '../../types/collections';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import EditCollectionModal from './EditCollectionModal';
import CreateCollectionModal from './CreateCollectionModal';

const HoveringDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
`;

const HoveringEditIcon = styled(EditIcon)`
  cursor: pointer;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CollectionsView() {
  const [deletingKey, setDeletingKey] = useState<string | null>();
  const [editingCollection, setEditingCollection] = useState<string | null>(
    null
  );
  const [creatingCollection, setCreatingCollection] = useState<boolean>(false);
  const [errorFetching, setErrorFetching] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<Array<CollectionName> | null>(
    null
  );

  const closeSnackAlert = useCallback(() => {
    setFeedbackMsg(null);
  }, []);

  const getCollections = useCallback(async () => {
    setLoading(true);
    try {
      const result = await CollectionsAPI.getCollections();
      setCollections(result.sort());
    } catch (e) {
      setErrorFetching(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCollection = useCallback(async () => {
    if (!deletingKey) return;
    try {
      const result = await CollectionsAPI.deleteCollection(deletingKey);
      if (result) {
        setDeletingKey(null);
        setFeedbackMsg('CollectionName deleted successfuly');
        // Update list
        await getCollections();
      } else {
        // An error ocurred deleting
      }
    } catch (e) {
      // do something
    }
  }, [deletingKey]);

  const updateCollection = useCallback(
    async (data: CollectionData) => {
      if (!editingCollection) return;
      try {
        const result = await CollectionsAPI.updateCollection(
          editingCollection,
          data
        );
        if (result) {
          setFeedbackMsg('Collection updated successfully');
          setEditingCollection(null);
          // Update list
          await getCollections();
        } else {
          // An error ocurred deleting
        }
      } catch (e) {
        // do something
      }
    },
    [editingCollection]
  );

  const createCollection = useCallback(
    async (collectionName: string, data: CollectionData) => {
      try {
        const result = await CollectionsAPI.createCollection(
          collectionName,
          data
        );
        if (result) {
          setFeedbackMsg('Collection updated successfully');
          setEditingCollection(null);
          // Update list
          await getCollections();
        } else {
          // An error ocurred deleting
        }
      } catch (e) {
        // do something
      }
    },
    [editingCollection]
  );

  useEffect(() => {
    getCollections();
  }, []);

  console.log('[View] Collections');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorFetching) {
    return <div>There was an error retrieving the collections</div>;
  }

  return collections?.length ? (
    <div>
      <Box sx={{ display: 'flex' }}>
        <h3 className="page-title">Collections</h3>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          className="create-button"
          title="Create collection"
          onClick={() => setCreatingCollection(true)}
        >
          <AddCircleOutlineOutlined />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell className="actions">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <div className="action-container">
                    <HoveringEditIcon
                      onClick={() => setEditingCollection(row.name)}
                    />
                    <HoveringDeleteIcon
                      onClick={() => setDeletingKey(row.name)}
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deletingKey ? (
        <ConfirmationDialog
          title="Confirm deletion"
          text="Are you sure you want to delete the record? Once done, there is no going back."
          onClose={() => setDeletingKey(null)}
          onConfirm={deleteCollection}
        />
      ) : null}
      <Snackbar
        open={!!feedbackMsg}
        autoHideDuration={1000}
        onClose={closeSnackAlert}
      >
        <Alert
          onClose={closeSnackAlert}
          severity="success"
          sx={{ width: '100%' }}
        >
          {feedbackMsg}
        </Alert>
      </Snackbar>
      {editingCollection && (
        <EditCollectionModal
          collectionName={editingCollection}
          onClose={() => setEditingCollection(null)}
          onSave={updateCollection}
        />
      )}
      {creatingCollection && (
        <CreateCollectionModal
          onClose={() => setCreatingCollection(false)}
          onSave={createCollection}
        />
      )}
    </div>
  ) : (
    <div>No collections to display</div>
  );
}
