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

  it('when we have an ad with the provided name should update the ad', async () => {
    // GIVEN
    await useCase.updateAd(adName, 'sticky_display', 780, 90);

    // EXPECT
    const ads = await adsCollection.find().toArray();
    expect(ads.length).toBe(1);
    expect(ads[0].name).toBe(adName);
    expect(ads[0].type).toBe('sticky_display');
    expect(ads[0].userId).toBe('123');
    expect(ads[0].size.height).toBe(780);
    expect(ads[0].size.width).toBe(90);
  });

  it('when we have no ad with the provided name should throw an error', async () => {
    const inexistentAdName = 'inexistent';
    let message = '';
    try {
      await useCase.updateAd(inexistentAdName, 'sticky_display', 780, 90);
    } catch (error) {
      message = error.message;
    }

    expect(message).toBe('Ad with name ' + inexistentAdName + ' does not exists.');
  });
})