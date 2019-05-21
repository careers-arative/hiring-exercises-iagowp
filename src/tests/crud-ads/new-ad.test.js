import { MongoClient } from "mongodb";

import Collections from '../../main/common/collections';

import AdsCRUDUseCase from '../../main/crud-ads/crud-ads-use-case';

describe('Testing new ad creation ', () => {
  let mongoClient, useCase, adsCollection, adName;

  beforeAll(async () => {
    mongoClient = new MongoClient(global.__MONGO_URI__, { useNewUrlParser: true });
    await mongoClient.connect();
  });

  afterAll(async () => {
    await mongoClient.close();
  });

  beforeEach(async () => {
    const collections = new Collections(mongoClient);
    adsCollection = await collections.AdsCollection();
    useCase = new AdsCRUDUseCase(collections);  
    adName = 'fake-ad';

    await useCase.createAd('123', adName, 'display', 300, 250);
  });

  afterEach(async () => {
    await adsCollection.removeMany({});
  });

  it('when creating a new ad and the ad does not already exists should create the new ad', async () => {
    const ads = await adsCollection.find().toArray();
    expect(ads.length).toBe(1);
    expect(ads[0].name).toBe(adName);
    expect(ads[0].type).toBe('display');
    expect(ads[0].userId).toBe('123');
    expect(ads[0].size.height).toBe(300);
    expect(ads[0].size.width).toBe(250);
  });

  it('when we have another ad with the provided name should not create the new ad', async () => {
    let message = '';
    try {
      await useCase.createAd('123', adName, 'display', 300, 250);
    } catch (error) {
      message = error.message;
    }

    expect(message).toBe('Ad with name ' + adName + ' already exists. Please use a new name.');
  });
  
});