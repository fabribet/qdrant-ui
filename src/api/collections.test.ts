import MockAdapter from 'axios-mock-adapter';
import {
  Collection,
  CreateCollectionInput,
  EditCollectionInput,
  OptimizersConfig,
} from '../types/collections';
import { VectorDistance } from '../utils/constants';
import { axiosInstance } from './baseAPI';
import collectionsAPI from './collections';

describe('CollectionsAPI', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('getCollections', () => {
    const COLLECTIONS = [{ name: 'collection1' }, { name: 'collection2' }];

    it('should call axios.get with the correct url and return the expected data', async () => {
      mock
        .onGet('/collections')
        .reply(200, { result: { collections: COLLECTIONS } });

      const response = await collectionsAPI.getCollections();

      expect(response).toEqual(COLLECTIONS);
      expect(mock.history.get[0].url).toEqual('collections');
    });

    it('should handle errors when getting collections', async () => {
      mock
        .onGet('/collections')
        .reply(500, { status: { error: 'the message' }, result: {} });

      await expect(collectionsAPI.getCollections()).rejects.toThrow();
      expect(mock.history.get[0].url).toEqual('collections');
    });
  });

  describe('getCollection', () => {
    const COLLECTION_NAME = 'test_collection';
    const COLLECTION: Collection = {
      config: {
        params: { vectors: { size: 1, distance: VectorDistance.EUCLID } },
      },
    } as Collection;

    it('should call axios.get with the correct url and return the expected data', async () => {
      mock
        .onGet(`/collections/${COLLECTION_NAME}`)
        .reply(200, { result: { ...COLLECTION } });

      const response = await collectionsAPI.getCollection(COLLECTION_NAME);

      expect(response).toEqual(COLLECTION);
      expect(mock.history.get[0].url).toEqual(`collections/${COLLECTION_NAME}`);
    });

    it('should handle errors when getting collections', async () => {
      mock
        .onGet(`/collections/${COLLECTION_NAME}`)
        .reply(404, { status: { error: 'the message' }, result: {} });

      await expect(collectionsAPI.getCollections()).rejects.toThrow();
      expect(mock.history.get[0].url).toEqual('collections');
    });
  });

  describe('createCollection', () => {
    const COLLECTION_NAME = 'test_collection';
    const COLLECTION_DATA: CreateCollectionInput = {
      vectors: { size: 1, distance: VectorDistance.EUCLID },
    };

    it('should call axios.put with the correct url and data and then return the expected data', async () => {
      mock
        .onPut(`/collections/${COLLECTION_NAME}`, COLLECTION_DATA)
        .reply(200, {
          time: 0,
          status: 'ok',
          result: true,
        });

      const response = await collectionsAPI.createCollection(
        COLLECTION_NAME,
        COLLECTION_DATA
      );

      expect(response).toEqual(true);
      expect(mock.history.put[0].url).toEqual(`collections/${COLLECTION_NAME}`);
      expect(mock.history.put[0].data).toEqual(JSON.stringify(COLLECTION_DATA));
    });

    it('should handle errors when creating a collection', async () => {
      mock
        .onPut(`/collections/${COLLECTION_NAME}`, COLLECTION_DATA)
        .reply(500, {
          result: {
            time: 0,
            status: { error: 'db is locked' },
            result: null,
          },
        });

      const result = await collectionsAPI.createCollection(
        COLLECTION_NAME,
        COLLECTION_DATA
      );
      expect(result).toBe(false);
      expect(mock.history.put[0].url).toEqual(`collections/${COLLECTION_NAME}`);
      expect(mock.history.put[0].data).toEqual(JSON.stringify(COLLECTION_DATA));
    });
  });

  describe('updateCollection', () => {
    const COLLECTION_NAME = 'test_collection';
    const COLLECTION_DATA: EditCollectionInput = {
      optimizers_config: {
        deleted_threshold: 1,
      } as OptimizersConfig,
    };

    it('should call axios.patch with the correct url and data and then return the expected data', async () => {
      mock
        .onPatch(`/collections/${COLLECTION_NAME}`, COLLECTION_DATA)
        .reply(200, {
          time: 0,
          status: 'ok',
          result: true,
        });

      const response = await collectionsAPI.updateCollection(
        COLLECTION_NAME,
        COLLECTION_DATA
      );

      expect(response).toEqual(true);
      expect(mock.history.patch[0].url).toEqual(
        `collections/${COLLECTION_NAME}`
      );
      expect(mock.history.patch[0].data).toEqual(
        JSON.stringify(COLLECTION_DATA)
      );
    });

    it('should handle errors when creating a collection', async () => {
      mock
        .onPatch(`/collections/${COLLECTION_NAME}`, COLLECTION_DATA)
        .reply(403, {
          time: 0,
          status: { error: 'db is locked' },
          result: null,
        });

      const result = await collectionsAPI.updateCollection(
        COLLECTION_NAME,
        COLLECTION_DATA
      );
      expect(result).toBe(false);
      expect(mock.history.patch[0].url).toEqual(
        `collections/${COLLECTION_NAME}`
      );
      expect(mock.history.patch[0].data).toEqual(
        JSON.stringify(COLLECTION_DATA)
      );
    });
  });

  describe('deleteCollection', () => {
    const COLLECTION_NAME = 'test_collection';

    it('should call axios.delete with the correct url and data and then return the expected data', async () => {
      mock.onDelete(`/collections/${COLLECTION_NAME}`).reply(200, {
        time: 0,
        status: 'ok',
        result: true,
      });

      const response = await collectionsAPI.deleteCollection(COLLECTION_NAME);

      expect(response).toEqual(true);
      expect(mock.history.delete[0].url).toEqual(
        `collections/${COLLECTION_NAME}`
      );
    });

    it('should handle errors when deleting a collection', async () => {
      mock.onDelete(`/collections/${COLLECTION_NAME}`).reply(403, {
        time: 0,
        status: { error: 'db is locked' },
        result: null,
      });

      const result = await collectionsAPI.deleteCollection(COLLECTION_NAME);
      expect(result).toBe(false);
      expect(mock.history.delete[0].url).toEqual(
        `collections/${COLLECTION_NAME}`
      );
    });
  });
});
