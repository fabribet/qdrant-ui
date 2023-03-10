import {
  Collection,
  CollectionData,
  CollectionName,
} from '../types/collections';
import BaseAPI from './baseAPI';

class CollectionsAPI extends BaseAPI {
  get moduleUrl() {
    return 'collections';
  }

  async getCollections(): Promise<Array<CollectionName>> {
    const {
      data: {
        result: { collections },
      },
    } = await this.get();
    console.log('received data', collections);
    return collections;
  }

  async getCollection(collectionName: string): Promise<Collection> {
    const {
      data: { result },
    } = await this.get(`/${collectionName}`);
    console.log(result);
    return result;
  }

  async deleteCollection(collectionName: string): Promise<boolean> {
    const {
      data: { result },
    } = await this.delete(`/${collectionName}`);
    return result;
  }

  async updateCollection(
    collectionName: string,
    data: CollectionData
  ): Promise<boolean> {
    const {
      data: { result },
    } = await this.patch(`/${collectionName}`, data);
    return result;
  }

  async createCollection(
    collectionName: string,
    data: CollectionData
  ): Promise<boolean> {
    const {
      data: { result },
    } = await this.put(`/${collectionName}`, data);
    return result;
  }
}

export default new CollectionsAPI();
