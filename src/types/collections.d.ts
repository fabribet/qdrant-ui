export interface CollectionName {
  name: string;
}

export type VectorDistance = 'Cosine' | 'Dot';

export interface Collection {
  status: string; // 'green';
  optimizer_status: string; // 'ok';
  vectors_count: number; // 0;
  indexed_vectors_count: number; //0;
  points_count: number; //0;
  segments_count: number; //0;
  config: {
    params: {
      vectors: {
        size: number; //1;
        distance: VectorDistance; //'Cosine';
      };
      shard_number: number; //1;
      replication_factor: number; //1;
      write_consistency_factor: number; //1;
      on_disk_payload: boolean; //false;
    };
    hnsw_config: {
      m: number; //0;
      ef_construct: number; //0;
      full_scan_threshold: number; //0;
      max_indexing_threads: number; //0;
      on_disk: boolean; //true;
      payload_m: number; //0;
    };
    optimizer_config: {
      deleted_threshold: number; //0;
      vacuum_min_vector_number: number; //0;
      default_segment_number: number; //0;
      max_segment_size: number | null; //null;
      memmap_threshold: number | null;
      indexing_threshold: number; //0;
      flush_interval_sec: number; // 0;
      max_optimization_threads: number; //0;
    };
    wal_config: {
      wal_capacity_mb: number; //0;
      wal_segments_ahead: number; //0;
    };
  };
  payload_schema: Record<string, unkown>;
}

export interface CollectionData {
  optimizer_config: {
    deleted_threshold: number; //0;
    vacuum_min_vector_number: number; //0;
    default_segment_number: number; //0;
    max_segment_size: number | null; //null;
    memmap_threshold: number | null;
    indexing_threshold: number; //0;
    flush_interval_sec: number; // 0;
    max_optimization_threads: number; //0;
  };
  replication_factor: number; //1;
  write_consistency_factor: number; //1;
  vectors: {
    size: number; //1;
    distance: VectorDistance; //'Cosine';
  };
}
