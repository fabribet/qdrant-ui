/* eslint-disable indent */
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { TextField, SelectChangeEvent } from '@mui/material';
import { CreateCollectionInput } from '../../types/collections';
import { VectorDistance } from '../../utils/constants';
import VectorDistanceSelect from './VectorDistanceSelect';
import CollectionModal from './CollectionModal';
import { isValidNewCollection, isValidName } from './utils';

interface CreateCollectionModalProps {
  onSave: (collectionName: string, collection: CreateCollectionInput) => void;
  onClose: () => void;
}

export default function CreateCollectionModal(
  props: CreateCollectionModalProps
) {
  const { onSave, onClose } = props;
  const [collectionName, setCollectionName] = useState<string>('');
  const [inputsValues, setInputsValues] = useState<CreateCollectionInput>({
    vectors: {
      distance: VectorDistance.COSINE,
      size: 1,
    },
  });
  const [nameFieldIsDirty, setNameFieldIsDirty] = useState<boolean>(false);

  const validName = useMemo(
    () => !nameFieldIsDirty || isValidName(collectionName),
    [collectionName, nameFieldIsDirty]
  );
  const validCollection = useMemo(
    () => isValidNewCollection(inputsValues),
    [inputsValues]
  );

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCollectionName(e.target.value);
    setNameFieldIsDirty(true);
  }, []);

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
    <CollectionModal
      onClose={onClose}
      onSubmit={onSubmit}
      title="Create new collection"
      submitButtonText="Create"
      // Feedback could be improved to let the user know why the submission is disabled.
      disableSubmit={!validName || !validCollection}
    >
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
        error={!validName}
        helperText={
          !validName && 'At least 3 alphanumeric chars or underscores ( _ )'
        }
      />
      <VectorDistanceSelect
        value={inputsValues.vectors.distance}
        onChange={onDistanceChange}
        error={!inputsValues.vectors.distance}
      />
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
        error={inputsValues.vectors.size < 1}
        helperText={
          inputsValues.vectors.size < 1 && 'Must be an integer greater than 0'
        }
      />
    </CollectionModal>
  );
}
