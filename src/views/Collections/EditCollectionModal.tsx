/* eslint-disable indent */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Typography,
  Box,
  TextField,
  DialogActions,
  Button,
  SelectChangeEvent,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CollectionsAPI from '../../api';
import {
  Collection,
  CollectionData,
  VectorDistance,
} from '../../types/collections';

interface EditCollectionModalProps {
  collectionName: string;
  onSave: (collection: CollectionData) => void;
  onClose: () => void;
}

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '90%',
};

export default function EditCollectionModal(props: EditCollectionModalProps) {
  const { collectionName, onSave, onClose } = props;
  const [collection, setCollection] = useState<Collection>();
  const [inputsValues, setInputsValues] = useState<CollectionData>();

  const getCollection = useCallback(async () => {
    // setLoading(true);
    try {
      const result = await CollectionsAPI.getCollection(collectionName);
      console.log('setting collection and input values');
      setCollection(result);
      // Another state could be added to warn when leaving with unsaved changes.
      setInputsValues({
        optimizer_config: {
          deleted_threshold: result.config.optimizer_config.deleted_threshold,
          vacuum_min_vector_number:
            result.config.optimizer_config.vacuum_min_vector_number,
          default_segment_number:
            result.config.optimizer_config.default_segment_number,
          max_segment_size: result.config.optimizer_config.max_segment_size,
          memmap_threshold: result.config.optimizer_config.memmap_threshold,
          indexing_threshold: result.config.optimizer_config.indexing_threshold,
          flush_interval_sec: result.config.optimizer_config.flush_interval_sec,
          max_optimization_threads:
            result.config.optimizer_config.max_optimization_threads,
        },
        replication_factor: result.config.params.replication_factor,
        write_consistency_factor: result.config.params.write_consistency_factor,
        vectors: {
          distance: result.config.params.vectors.distance,
          size: result.config.params.vectors.size,
        },
      });
    } catch (e) {
      // setErrorFetching(true);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCollection();
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(`onInputChange => [${e.target.id}: ${e.target.value}`);
      console.log('inputValues', inputsValues);
      if (!inputsValues) return;
      const inputId = e.target.id;
      const newValue = Number(e.target.value);
      const newState =
        inputId in inputsValues.optimizer_config
          ? {
              ...inputsValues,
              optimizer_config: {
                ...inputsValues.optimizer_config,
                [inputId]: newValue,
              },
            }
          : {
              ...inputsValues,
              [inputId]: newValue,
            };
      console.log('newState', newState);
      setInputsValues(newState);
    },
    [inputsValues]
  );

  const onVectorSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!inputsValues) return;
      setInputsValues({
        ...inputsValues,
        vectors: {
          ...inputsValues.vectors,
          size: Number(e.target.value),
        },
      });
    },
    [inputsValues]
  );

  const onDistanceChange = useCallback(
    (e: SelectChangeEvent<VectorDistance>) => {
      if (!inputsValues) return;
      setInputsValues({
        ...inputsValues,
        vectors: {
          ...inputsValues.vectors,
          distance: e.target.value as VectorDistance,
        },
      });
    },
    [inputsValues]
  );

  const onSubmit = useCallback(async () => {
    onSave(inputsValues!);
  }, [inputsValues]);

  if (!collection || !inputsValues) return null;

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBoxStyle}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          style={{ marginBottom: 40 }}
        >
          Edit {`'${collectionName}'`} collection
        </Typography>
        <Box sx={{ display: 'flex', gap: 10 }}>
          <Box sx={{ maxWidth: 180 }}>
            <Typography>Optimizer configuration</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="deleted_threshold"
              label="Deleted treshold"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.deleted_threshold}
              required
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="vacuum_min_vector_number"
              label="vacuum min vector number"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.vacuum_min_vector_number}
              required
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="default_segment_number"
              label="Default segment number"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.default_segment_number}
              required
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="max_segment_size"
              label="Maximum segment size"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.max_segment_size}
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="memmap_threshold"
              label="Memap treshold"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.memmap_threshold}
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="indexing_threshold"
              label="Indexing treshold"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.indexing_threshold}
              required
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="flush_interval_sec"
              label="Flush interval sec"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.flush_interval_sec}
              required
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="max_optimization_threads"
              label="Maximum optimization threads"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.optimizer_config.max_optimization_threads}
              required
              onChange={onInputChange}
            />
          </Box>
          <Box sx={{ maxWidth: 180 }}>
            <Typography>Vectors</Typography>
            <InputLabel id="demo-simple-select-standard-label">
              Distance
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="distance"
              value={inputsValues.vectors.distance}
              onChange={onDistanceChange}
              label="Distance"
            >
              <MenuItem value="Cosine">Cosine</MenuItem>
              <MenuItem value="Dot">Dot</MenuItem>
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="size"
              label="Vector size"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.vectors.size}
              required
              onChange={onVectorSizeChange}
            />
            <Typography>Parameters</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="replication_factor"
              label="Replication factor"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.replication_factor}
              required
              onChange={onInputChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="write_consistency_factor"
              label="Write consistency factor"
              type="number"
              fullWidth
              variant="standard"
              value={inputsValues.write_consistency_factor}
              required
              onChange={onInputChange}
            />
          </Box>
        </Box>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </DialogActions>
      </Box>
    </Modal>
  );
}
