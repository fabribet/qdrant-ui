import BaseAPI from './baseAPI';

export default class CollectionsAPI extends BaseAPI {
  moduleUrl = 'collections';

  async getCollections() {
    console.log('[getCollections]this->', this);
    const {
      data: {
        result: { collections },
      },
    } = await this.get();
    console.log('received data', collections);
    return collections;
  }
}
