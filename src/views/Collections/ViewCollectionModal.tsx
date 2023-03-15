/* eslint-disable indent */
import React from 'react';
import { Typography, Box } from '@mui/material';
import { Collection } from '../../types/collections';
import CollectionModal from './CollectionModal';

interface EditCollectionModalProps {
  collectionName: string;
  collection: Collection;
  onClose: () => void;
}

const subtitleStyle = {
  color: 'gray',
  fontSize: '22px',
  marginBottom: '15px',
  marginTop: '15px',
};

const KeyValuePair = ({
  name,
  value,
}: {
  name: string;
  value: string | number | boolean | null;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '5px',
        marginBottom: '8px',
        alignItems: 'center',
      }}
    >
      <Typography variant="subtitle1">{`${name}:`}</Typography>
      <Typography variant="body1">{String(value) || '-'}</Typography>
    </Box>
  );
};

export default function ViewCollectionModal(props: EditCollectionModalProps) {
  const { collectionName, collection, onClose } = props;

  return (
    <CollectionModal
      onClose={onClose}
      title={`View '${collectionName}'`}
      columns={2}
    >
      {/* Left Column */}
      <Box>
        <KeyValuePair name="Status" value={collection.status} />
        <KeyValuePair name="Vectors count" value={collection.vectors_count} />
        <KeyValuePair name="Segments count" value={collection.segments_count} />
        <KeyValuePair
          name="Optimizer status"
          value={collection.optimizer_status}
        />
        <KeyValuePair
          name="Indexed vectors count"
          value={collection.indexed_vectors_count}
        />
        <KeyValuePair name="Points count" value={collection.points_count} />
        <Typography variant="h6" sx={subtitleStyle}>
          {'Config [Params]'}
        </Typography>
        <KeyValuePair
          name="Vector size"
          value={collection.config.params.vectors.size}
        />
        <KeyValuePair
          name="Vector distance"
          value={collection.config.params.vectors.distance}
        />
        <KeyValuePair
          name="Shard number"
          value={collection.config.params.shard_number}
        />
        <KeyValuePair
          name="Replication factor"
          value={collection.config.params.replication_factor}
        />
        <KeyValuePair
          name="Write consistency factor"
          value={collection.config.params.write_consistency_factor}
        />
        <KeyValuePair
          name="On disk payload"
          value={collection.config.params.on_disk_payload}
        />

        <Typography variant="h6" sx={subtitleStyle}>
          {'Wal config'}
        </Typography>
        <KeyValuePair
          name="Wal capacity mb treshold"
          value={collection.config.wal_config.wal_capacity_mb}
        />
        <KeyValuePair
          name="Wal segments ahead"
          value={collection.config.wal_config.wal_segments_ahead}
        />
      </Box>
      {/* Right Column */}
      <Box>
        <Typography variant="h6" sx={subtitleStyle}>
          {'Hsnw config'}
        </Typography>
        <KeyValuePair name="M" value={collection.config.hnsw_config.m} />
        <KeyValuePair
          name="Ef construct"
          value={collection.config.hnsw_config.ef_construct}
        />
        <KeyValuePair
          name="Full scan treshold"
          value={collection.config.hnsw_config.full_scan_threshold}
        />
        <KeyValuePair
          name="Max indexing threads"
          value={collection.config.hnsw_config.max_indexing_threads}
        />
        <KeyValuePair
          name="On disk"
          value={collection.config.hnsw_config.on_disk}
        />
        <Typography variant="h6" sx={subtitleStyle}>
          {'Optimizer config'}
        </Typography>
        <KeyValuePair
          name="Deleted treshold"
          value={collection.config.optimizer_config.deleted_threshold}
        />
        <KeyValuePair
          name="Vacuum min vector number"
          value={collection.config.optimizer_config.vacuum_min_vector_number}
        />
        <KeyValuePair
          name="Default segment number"
          value={collection.config.optimizer_config.default_segment_number}
        />
        <KeyValuePair
          name="Max segment size"
          value={collection.config.optimizer_config.max_segment_size}
        />
        <KeyValuePair
          name="Memmap treshold"
          value={collection.config.optimizer_config.memmap_threshold}
        />
        <KeyValuePair
          name="Indexing treshold"
          value={collection.config.optimizer_config.indexing_threshold}
        />
        <KeyValuePair
          name="Flush interval sec"
          value={collection.config.optimizer_config.flush_interval_sec}
        />
        <KeyValuePair
          name="Max optimization threads"
          value={collection.config.optimizer_config.max_optimization_threads}
        />
      </Box>
    </CollectionModal>
  );
}
