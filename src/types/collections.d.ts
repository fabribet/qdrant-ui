import { VectorDistance } from '../utils/constants';

export interface CollectionName {
  name: string;
}

export interface OptimizersConfig {
  deleted_threshold: number;
  vacuum_min_vector_number: number;
  default_segment_number: number;
  max_segment_size: number | null;
  memmap_threshold: number | null;
  indexing_threshold: number;
  flush_interval_sec: number;
  max_optimization_threads: number;
}

export interface Collection {
  config: {
    params: {
      vectors: {
        size: number;
        distance: VectorDistance;
      };
      // Currently unused since it is not necessary so far.
      shard_number: number;
      replication_factor: number;
      write_consistency_factor: number;
      on_disk_payload: boolean;
    };
    // Everything below is not used yet
    hnsw_config: {
      m: number;
      ef_construct: number;
      full_scan_threshold: number;
      max_indexing_threads: number;
      on_disk: boolean; //true;
      payload_m: number;
    };
    optimizer_config: OptimizersConfig;
    wal_config: {
      wal_capacity_mb: number;
      wal_segments_ahead: number;
    };
  };
  status: string;
  optimizer_status: string;
  vectors_count: number;
  indexed_vectors_count: number;
  points_count: number;
  segments_count: number;
  payload_schema: Record<string, unkown>;
}

export interface CreateCollectionInput {
  vectors: {
    size: number;
    distance: VectorDistance;
  };
}

export interface EditCollectionInput {
  optimizers_config: OptimizersConfig;
}
