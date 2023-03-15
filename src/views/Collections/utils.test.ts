import { EditCollectionInput, OptimizersConfig } from '../../types/collections';
import { VectorDistance } from '../../utils/constants';
import {
  isValidNewCollection,
  getUpdateInputErrors,
  isValidName,
  UpdateInputErrors,
} from './utils';

describe('Collection utils', () => {
  describe('isValidNewCollection', () => {
    test('when distance is not valid should return FALSE', () => {
      expect(
        isValidNewCollection({
          vectors: { distance: 'invalidD' as VectorDistance, size: 1 },
        })
      ).toBe(false);
    });

    test('when size is lower than 1 return FALSE', () => {
      expect(
        isValidNewCollection({
          vectors: { distance: VectorDistance.COSINE, size: -1 },
        })
      ).toBe(false);
    });

    test('when size is not an integer should return FALSE', () => {
      expect(
        isValidNewCollection({
          vectors: { distance: VectorDistance.COSINE, size: 1.8 },
        })
      ).toBe(false);
    });

    test('when all data is valid should return TRUE', () => {
      expect(
        isValidNewCollection({
          vectors: { distance: VectorDistance.COSINE, size: 18 },
        })
      ).toBe(true);
    });
  });

  describe('getUpdateInputErrors', () => {
    const DEFAULT_INPUT: EditCollectionInput = {
      optimizers_config: {
        deleted_threshold: 0,
        vacuum_min_vector_number: 0,
        default_segment_number: 0,
        max_segment_size: 0, // null,
        memmap_threshold: 0, // null;
        indexing_threshold: 0,
        flush_interval_sec: 0,
        max_optimization_threads: 0,
      },
    };

    const getInput = (data?: Partial<OptimizersConfig>) => ({
      ...DEFAULT_INPUT,
      optimizers_config: {
        ...DEFAULT_INPUT.optimizers_config,
        ...data,
      },
    });

    test('when input is not provided should return the error', () => {
      expect(getUpdateInputErrors()).toMatchObject({
        error: true,
      });
    });

    test('when one of the values is negative error should return the error', () => {
      const inputErrors = getUpdateInputErrors(
        getInput({ deleted_threshold: -1 })
      );
      expect(inputErrors).toMatchObject({
        error: true,
        optimizers_config: {
          deleted_threshold: true,
        },
      });
    });

    test('when a non-nullable field is null should return the error', () => {
      const inputErrors = getUpdateInputErrors(
        // Using any on propouse to check the null condition
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getInput({ flush_interval_sec: null } as any)
      );
      expect(inputErrors).toMatchObject({
        error: true,
        optimizers_config: {
          flush_interval_sec: true,
        },
      });
    });

    test('when a non-float field has floating point should return the error', () => {
      const inputErrors = getUpdateInputErrors(
        getInput({ vacuum_min_vector_number: 1.4 })
      );
      expect(inputErrors).toMatchObject({
        error: true,
        optimizers_config: {
          vacuum_min_vector_number: true,
        },
      });
    });

    describe('when all fields are correct', () => {
      const expectNoErrors = (inputErrors: UpdateInputErrors) => {
        expect(inputErrors).toMatchObject({
          error: false,
        });
        expect(
          Object.values(inputErrors.optimizers_config).find((value) => value)
        ).toBeUndefined();
      };

      test('should return no error', () => {
        const inputErrors = getUpdateInputErrors(getInput());
        expectNoErrors(inputErrors);
      });

      test('including a null should return no error', () => {
        const inputErrors = getUpdateInputErrors(
          getInput({ memmap_threshold: null })
        );
        expectNoErrors(inputErrors);
      });

      test('including a float should return no error', () => {
        const inputErrors = getUpdateInputErrors(
          getInput({ deleted_threshold: 1.3 })
        );
        expectNoErrors(inputErrors);
      });
    });
  });

  describe('isValidName', () => {
    test('when name is shorter than 3 chars should return FALSE', () => {
      expect(isValidName('wa')).toBe(false);
    });

    test('when name contains a symbol it should return FALSE', () => {
      expect(isValidName('wa2$')).toBe(false);
    });

    test('when name contains spaces it should return FALSE', () => {
      expect(isValidName('wa2 col')).toBe(false);
    });

    test('when only alphanumeric chars and underscores are present it should return TRUE', () => {
      expect(isValidName('wa2_col')).toBe(true);
    });
  });
});
