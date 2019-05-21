import { MongoClient } from "mongodb";

import Collections from '../../main/common/collections';

import AdsCRUDUseCase from '../../main/crud-ads/crud-ads-use-case';

describe('Testing update ad ', () => {
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

    adName = 'fake-ad';

    useCase = new AdsCRUDUseCase(collections);

    await adsCollection.insertOne({
      userId: '123',
      name: adName,
      type: 'display',
      size: {
        height: 300,
        width: 250
      }
    })
  });

  afterEach(async () => {
    await adsCollection.removeMany({});
  });

  it('when we have an ad with the provided name should delete the ad', async () => {
    // GIVEN
    await useCase.deleteAd(adName);

    // EXPECT
    const ads = await adsCollection.find().toArray();
    expect(ads.length).toBe(0);
  });

  it('when we have no ad with the provided name should throw an error', async () => {
    const inexistentAdName = 'inexistent';
    let message = '';
    try {
      await useCase.deleteAd(inexistentAdName);
    } catch (error) {
      message = error.message;
    }

    expect(message).toBe('Ad with name ' + inexistentAdName + ' does not exists.');
  });
})