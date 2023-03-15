import React from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { VectorDistance } from '../../../../utils/constants';

interface SelectProps {
  value: VectorDistance;
  onChange: (e: SelectChangeEvent<VectorDistance>) => void;
  error?: boolean;
}

export default function VectorDistanceSelect({
  value,
  onChange,
  error,
}: SelectProps) {
  return (
    <div>
      <InputLabel id="demo-simple-select-standard-label">
        Vector Distance
      </InputLabel>
      <Select<VectorDistance>
        id="distance"
        value={value}
        onChange={onChange}
        label="Vector Distance"
        sx={{ width: '100% ' }}
        error={error}
        data-testid="distance-select"
      >
        <MenuItem value={VectorDistance.COSINE}>Cosine</MenuItem>
        <MenuItem value={VectorDistance.DOT}>Dot</MenuItem>
        <MenuItem value={VectorDistance.EUCLID}>Euclid</MenuItem>
      </Select>
    </div>
  );
}
