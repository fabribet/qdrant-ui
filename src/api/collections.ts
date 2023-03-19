import {
  Collection,
  CollectionName,
  EditCollectionInput,
  CreateCollectionInput,
} from '../types/collections';
import BaseAPI from './baseAPI';

export class CollectionsAPI extends BaseAPI {
  get moduleUrl() {
    return 'collections';
  }

  async getCollections(): Promise<Array<CollectionName>> {
    const response = await this.get();

    const {
      data: {
        result: { collections },
      },
    } = response;
    return collections;
  }

  async getCollection(collectionName: string): Promise<Collection> {
    const {
      data: { result },
    } = await this.get(`/${collectionName}`);
    return result;
  }

  async deleteCollection(collectionName: string): Promise<boolean> {
    const response = await this.delete(`/${collectionName}`);
    return !!response?.data?.result?.result === true;
  }

  async updateCollection(
    collectionName: string,
    data: EditCollectionInput
  ): Promise<boolean> {
    const response = await this.patch(`/${collectionName}`, data);
    return !!response?.data?.result?.result === true;
  }

  async createCollection(
    collectionName: string,
    data: CreateCollectionInput
  ): Promise<boolean> {
    const response = await this.put(`/${collectionName}`, data);
    return response?.data?.result?.result === true;
  }
}

export default new CollectionsAPI();
