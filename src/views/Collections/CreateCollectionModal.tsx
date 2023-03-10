/* eslint-disable indent */
import React, { ChangeEvent, useCallback, useState } from 'react';
import {
  Modal,
  Typography,
  Box,
  TextField,
  DialogActions,
  Button,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { CollectionData, VectorDistance } from '../../types/collections';

interface CreateCollectionModalProps {
  onSave: (collectionName: string, collection: CollectionData) => void;
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

export default function CreateCollectionModal(
  props: CreateCollectionModalProps
) {
  const { onSave, onClose } = props;
  const [collectionName, setCollectionName] = useState<string>('');
  const [inputsValues, setInputsValues] = useState<CollectionData>({
    optimizer_config: {
      deleted_threshold: 0,
      vacuum_min_vector_number: 0,
      default_segment_number: 0,
      max_segment_size: null,
      memmap_threshold: null,
      indexing_threshold: 0,
      flush_interval_sec: 0,
      max_optimization_threads: 0,
    },
    replication_factor: 0,
    write_consistency_factor: 0,
    vectors: {
      distance: 'Cosine',
      size: 0,
    },
  });

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCollectionName(e.target.value);
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
      setInputsValues(newState);
    },
    [inputsValues]
  );

  const onVectorSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
    if (collectionName) onSave(collectionName, inputsValues);
  }, [inputsValues]);

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
          Create new collection
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="collection_name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={collectionName}
          required
          onChange={onNameChange}
        />
        <Box sx={{ display: 'flex', gap: 10, marginTop: 2 }}>
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
            <Select<VectorDistance>
              labelId="demo-simple-select-standard-label"
              id="distance"
              value={inputsValues.vectors.distance}
              onChange={onDistanceChange}
              label="Distance"
            >
              <MenuItem value={'Cosine'}>Cosine</MenuItem>
              <MenuItem value={'Dot'}>Dot</MenuItem>
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
