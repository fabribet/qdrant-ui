import BaseAPI from './baseAPI';

/**
 * API related to the Database lock.
 */
class LocksAPI extends BaseAPI {
  get moduleUrl() {
    return 'locks';
  }

  async getLock(): Promise<boolean> {
    const {
      data: {
        result: { write },
      },
    } = await this.get();
    return write;
  }

  async setLock({
    write,
    errorMessage,
  }: {
    write: boolean;
    errorMessage: string;
  }): Promise<{ error_message: string; write: boolean }> {
    const {
      data: { result },
    } = await this.post('', { write, error_message: errorMessage });
    return result;
  }
}

export default new LocksAPI();
