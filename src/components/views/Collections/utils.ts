import {
  CreateCollectionInput,
  EditCollectionInput,
  OptimizersConfig,
} from '../../../types/collections';
import { VectorDistance } from '../../../utils/constants';

/**
 * Checks that the provided collection data is valid to create a new record.
 */
export const isValidNewCollection = (collectionData: CreateCollectionInput) => {
  const { distance, size } = collectionData.vectors;
  return (
    Object.values(VectorDistance).includes(distance) &&
    Number.isInteger(size) &&
    size >= 1
  );
};

/**
 * Defines an array of colection fields that are allowed to be null.
 */
export const NULLABLE_FIELDS: Array<keyof OptimizersConfig> = [
  'memmap_threshold',
  'max_segment_size',
];

/**
 * Defines an array of collection fields that accept a floating point.
 */
export const FIELDS_ACCEPTING_FLOAT: Array<keyof OptimizersConfig> = [
  'deleted_threshold',
];

/**
 * Checks if the provided field name has valid value.
 */
const isValidFieldEdition = (
  field: keyof OptimizersConfig,
  value: number | null
) =>
  // field should not be nullable and it isn't defined
  !(
    (!NULLABLE_FIELDS.includes(field as keyof OptimizersConfig) &&
      value == null) ||
    (value != null &&
      // Value is defined and has a floating point when it should be integer
      ((!FIELDS_ACCEPTING_FLOAT.includes(field as keyof OptimizersConfig) &&
        !Number.isInteger(value)) ||
        // value is negative.
        value < 0))
  );

type ToBoolean<Type> = {
  // For every existing property inside the type of Type
  // convert it to be an optional 'boolean' version
  [Property in keyof Type]?: boolean;
};

export interface UpdateInputErrors {
  optimizers_config: ToBoolean<OptimizersConfig>;
  error: boolean;
}

/**
 * Checks all the fields of a collection update and returns if there is an error by providing the invalid field.
 */
export const getUpdateInputErrors = (
  collectionData?: EditCollectionInput
): UpdateInputErrors => {
  if (!collectionData) {
    return { error: true, optimizers_config: {} };
  }
  const inputErrors = Object.keys(collectionData.optimizers_config).reduce(
    (result: UpdateInputErrors, field) => {
      const value =
        collectionData.optimizers_config[field as keyof OptimizersConfig];
      const isInvalid = !isValidFieldEdition(
        field as keyof OptimizersConfig,
        value
      );
      result.optimizers_config[field as keyof OptimizersConfig] = isInvalid;
      result.error = result.error || isInvalid;
      return result;
    },
    { optimizers_config: {}, error: false }
  );
  return inputErrors;
};

const ALPHANUMERIC_UNDERSCORE_REGEXP = /^\w+$/;
/**
 * Checks if that provided collection name is valid.
 */
export const isValidName = (name: string) => {
  return name.length > 2 && ALPHANUMERIC_UNDERSCORE_REGEXP.test(name);
};
