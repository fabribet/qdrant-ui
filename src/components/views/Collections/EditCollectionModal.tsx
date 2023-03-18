/* eslint-disable indent */
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import { Collection, EditCollectionInput } from '../../../types/collections';
import CollectionModal from './CollectionModal';
import { getUpdateInputErrors, UpdateInputErrors } from './utils';

interface EditCollectionModalProps {
  collection: Collection;
  collectionName: string;
  onSave: (collection: EditCollectionInput) => void;
  onClose: () => void;
  submitting?: boolean;
}

export default function EditCollectionModal(props: EditCollectionModalProps) {
  const { collection, collectionName, onSave, onClose, submitting } = props;
  const [inputsValues, setInputsValues] = useState<EditCollectionInput>({
    optimizers_config: {
      ...collection.config.optimizer_config,
    },
  });

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputsValues({
        ...inputsValues,
        optimizers_config: {
          ...inputsValues.optimizers_config,
          [e.target.id]: Number(e.target.value),
        },
      });
    },
    [inputsValues]
  );

  const inputErrors: UpdateInputErrors = useMemo(
    () => getUpdateInputErrors(inputsValues),
    [inputsValues]
  );

  const onSubmit = useCallback(async () => {
    onSave(inputsValues);
  }, [inputsValues]);

  return (
    <CollectionModal
      onClose={onClose}
      onSubmit={onSubmit}
      title={`Edit '${collectionName}' collection`}
      submitButtonText="Save"
      submitting={submitting}
      disableSubmit={inputErrors.error}
    >
      <TextField
        autoFocus
        margin="dense"
        id="indexing_threshold"
        label="Indexing threshold"
        type="number"
        fullWidth
        variant="standard"
        value={inputsValues.optimizers_config.indexing_threshold}
        required
        onChange={onInputChange}
        error={inputErrors.optimizers_config.indexing_threshold}
      />
      <TextField
        autoFocus
        margin="dense"
        id="deleted_threshold"
        label="Deleted threshold"
        type="number"
        fullWidth
        variant="standard"
        value={inputsValues.optimizers_config.deleted_threshold}
        required
        onChange={onInputChange}
        error={inputErrors.optimizers_config.deleted_threshold}
      />
      <TextField
        autoFocus
        margin="dense"
        id="vacuum_min_vector_number"
        label="Vacuum min vector number"
        type="number"
        fullWidth
        variant="standard"
        value={inputsValues.optimizers_config.vacuum_min_vector_number}
        required
        onChange={onInputChange}
        error={inputErrors.optimizers_config.vacuum_min_vector_number}
      />
      <TextField
        autoFocus
        margin="dense"
        id="default_segment_number"
        label="Default segment number"
        type="number"
        fullWidth
        variant="standard"
        value={inputsValues.optimizers_config.default_segment_number}
        required
        onChange={onInputChange}
        error={inputErrors.optimizers_config.default_segment_number}
      />
      <TextField
        autoFocus
        margin="dense"
        id="memmap_threshold"
        label="Memap threshold"
        type="number"
        fullWidth
        variant="standard"
        value={inputsValues.optimizers_config.memmap_threshold}
        required
        onChange={onInputChange}
        error={inputErrors.optimizers_config.memmap_threshold}
      />
      <TextField
        autoFocus
        margin="dense"
        id="flush_interval_sec"
        label="Flush interval sec"
        type="number"
        fullWidth
        variant="standard"
        value={inputsValues.optimizers_config.flush_interval_sec}
        required
        onChange={onInputChange}
        error={inputErrors.optimizers_config.flush_interval_sec}
      />
      <TextField
        autoFocus
        margin="dense"
        id="max_optimization_threads"
        label="Max optimization threads"
        type="number"
        fullWidth
        variant="standard"
        value={inputsValues.optimizers_config.max_optimization_threads}
        required
        onChange={onInputChange}
        error={inputErrors.optimizers_config.max_optimization_threads}
      />
    </CollectionModal>
  );
}
