import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from './baseAPI';
import locksAPI from './locks';

describe('LocksAPI', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('getLock', () => {
    const LOCK_VALUE = false;
    const LOCK_DATA = {
      time: 0,
      status: 'ok',
      result: {
        error_message: 'the error ms',
        write: LOCK_VALUE,
      },
    };

    it('should call axios.get with the correct url and return the expected data', async () => {
      mock.onGet('/locks').reply(200, LOCK_DATA);

      const response = await locksAPI.getLock();

      expect(response).toEqual(LOCK_VALUE);
      expect(mock.history.get[0].url).toEqual('locks');
    });

    it('should handle errors when getting collections', async () => {
      mock
        .onGet('/locks')
        .reply(500, { status: { error: 'the message' }, result: {} });

      await expect(locksAPI.getLock()).rejects.toThrow();
      expect(mock.history.get[0].url).toEqual('locks');
    });
  });

  describe('lock', () => {
    const LOCK_DATA = {
      errorMessage: 'the message',
      write: true,
    };

    it('should call axios.get with the correct url and return the expected data', async () => {
      mock.onPost('/locks').reply(200, {
        time: 0,
        status: 'ok',
        result: {
          write: LOCK_DATA.write,
          error_message: LOCK_DATA.errorMessage,
        },
      });

      const response = await locksAPI.lock(LOCK_DATA);

      expect(response).toEqual({
        write: LOCK_DATA.write,
        error_message: LOCK_DATA.errorMessage,
      });
      expect(mock.history.post[0].url).toEqual('locks');
    });

    it('should handle errors when getting collections', async () => {
      mock
        .onPost('locks')
        .reply(403, { status: { error: 'the message' }, result: {} });

      await expect(locksAPI.lock(LOCK_DATA)).rejects.toThrow();
      expect(mock.history.post[0].url).toEqual('locks');
    });
  });
});
