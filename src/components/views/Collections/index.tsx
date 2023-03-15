import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { AddCircleOutlineOutlined } from '@mui/icons-material';

import { CollectionsAPI } from '../../../api';
import {
  Collection,
  CollectionName,
  EditCollectionInput,
  CreateCollectionInput,
} from '../../../types/collections';
import ConfirmationDialog from '../../ConfirmationDialog';
import EditCollectionModal from './EditCollectionModal';
import CreateCollectionModal from './CreateCollectionModal';
import ViewCollectionModal from './ViewCollectionModal';
import LoadingBackdrop from '../../LoadingBackdrop';
import CustomSnackbarMsg from '../../CustomSnackbarMsg';
import { SnackbarType } from '../../../utils/constants';
import {
  HoveringDeleteIcon,
  HoveringEditIcon,
  HoveringPreviewIcon,
  StyledTableCell,
  StyledTableRow,
} from './styledComponents';

export default function CollectionsView() {
  const [deletingKey, setDeletingKey] = useState<string | null>();
  const [editingCollection, setEditingCollection] = useState<string | null>(
    null
  );
  const [viewingCollectionName, setViewingCollectionName] = useState<
    string | null
  >(null);
  const [creatingCollection, setCreatingCollection] = useState<boolean>(false);
  const [errorFetching, setErrorFetching] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{
    type: SnackbarType;
    msg: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<Array<CollectionName> | null>(
    null
  );
  const [fetchingCollection, setFetchingCollection] = useState<boolean>(false);
  const [collection, setCollection] = useState<Collection>();

  const getCollection = useCallback(async (collectionName: string) => {
    setFetchingCollection(true);
    try {
      const result = await CollectionsAPI.getCollection(collectionName);
      setCollection(result);
    } catch (e) {
      setFeedbackMsg({
        type: SnackbarType.ERROR,
        msg: `There was a problem loading '${collectionName}'s info`,
      });
    } finally {
      setFetchingCollection(false);
    }
  }, []);

  const setErrorSnackMsg = useCallback((msg: string) => {
    setFeedbackMsg({ type: SnackbarType.ERROR, msg });
  }, []);

  const setSuccessSnackMsg = useCallback((msg: string) => {
    setFeedbackMsg({ type: SnackbarType.SUCCESS, msg });
  }, []);

  useEffect(() => {
    const collectionName = editingCollection || viewingCollectionName;
    if (collectionName) {
      getCollection(collectionName);
    }
  }, [editingCollection, viewingCollectionName]);

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
      console.error('error retrieving collections', e);
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
        setSuccessSnackMsg(`${deletingKey} deleted successfuly`);
        // Update list
        await getCollections();
      } else {
        setErrorSnackMsg(`There was a problem deleting '${deletingKey}'`);
      }
    } catch (e) {
      setErrorSnackMsg(`There was a problem deleting '${deletingKey}'`);
    }
  }, [deletingKey]);

  const updateCollection = useCallback(
    async (data: EditCollectionInput) => {
      if (!editingCollection) return;
      try {
        const result = await CollectionsAPI.updateCollection(
          editingCollection,
          data
        );
        if (result) {
          setSuccessSnackMsg('Collection updated successfully');
          setEditingCollection(null);
          // Update list
          await getCollections();
        } else {
          setErrorSnackMsg(
            `There was a problem updating '${editingCollection}'`
          );
        }
      } catch (e) {
        setErrorSnackMsg(`There was a problem updating '${editingCollection}'`);
      }
    },
    [editingCollection]
  );

  const createCollection = useCallback(
    async (collectionName: string, data: CreateCollectionInput) => {
      try {
        setLoading(true);
        const result = await CollectionsAPI.createCollection(
          collectionName,
          data
        );
        if (result) {
          setSuccessSnackMsg(
            `Collection '${collectionName}' created successfully`
          );
          setCreatingCollection(false);
          // Update list
          await getCollections();
        } else {
          setErrorSnackMsg('There was a problem creating the collection');
        }
      } catch (e) {
        setErrorSnackMsg('There was a problem creating the collection');
      } finally {
        setLoading(false);
      }
    },
    [editingCollection]
  );

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <>
      <LoadingBackdrop loading={loading || fetchingCollection} />
      <div>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h6" sx={{ textAlign: 'left', flexGrow: 1 }}>
            Collections
          </Typography>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            title="Create collection"
            onClick={() => setCreatingCollection(true)}
            disabled={errorFetching}
            sx={{ flexShrink: 0, maxWidth: 'fit-content', minWidth: '60px;' }}
          >
            <AddCircleOutlineOutlined />
          </IconButton>
        </Box>
        {/* Eventually, as features grow, the table could be abstracted out of Collections as a more generic component. */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell className="actions">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections?.length ? (
                collections.map((row) => (
                  <StyledTableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Tooltip title="View">
                          <HoveringPreviewIcon
                            onClick={() => setViewingCollectionName(row.name)}
                          />
                        </Tooltip>
                        <Tooltip title="Edit">
                          <HoveringEditIcon
                            onClick={() => setEditingCollection(row.name)}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <HoveringDeleteIcon
                            onClick={() => setDeletingKey(row.name)}
                          />
                        </Tooltip>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    colSpan={2}
                    sx={{ textAlign: 'center' }}
                  >
                    {errorFetching ? (
                      <Typography color="error">
                        There was an error retrieving the collections. Try
                        refreshing the page.
                      </Typography>
                    ) : (
                      'No collections to display'
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {deletingKey ? (
          <ConfirmationDialog
            title="Confirm deletion"
            text="Are you sure you want to delete the record? Once done, there is no going back."
            onClose={() => setDeletingKey(null)}
            onConfirm={deleteCollection}
            dangerConfirmation
          />
        ) : null}
        <CustomSnackbarMsg
          message={feedbackMsg?.msg}
          type={feedbackMsg?.type}
          onClose={closeSnackAlert}
        />
        {editingCollection && !fetchingCollection && collection && (
          <EditCollectionModal
            collection={collection}
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
        {viewingCollectionName && !fetchingCollection && collection && (
          <ViewCollectionModal
            collectionName={viewingCollectionName}
            collection={collection}
            onClose={() => setViewingCollectionName(null)}
          />
        )}
      </div>
    </>
  );
}
