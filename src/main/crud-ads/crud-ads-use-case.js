export default class AdsCRUDUseCase {
  constructor (collections) {
    this.collections = collections;
  }

  async createAd (userId, name, type, height, width) {
    const adsCollection = await this.collections.AdsCollection();
    await validateAdDoesNotAlreadyExists(name, adsCollection);

    return adsCollection.insertOne({
      userId: userId,
      name: name,
      type: type,
      size: {
        height: height,
        width: width
      }
    });
  }

  async updateAd (name, type, height, width) {
    const adsCollection = await this.collections.AdsCollection();
    await validateAdExists(name, adsCollection);

    return adsCollection.updateOne(
      { name: name },
      { $set: { type: type, 'size.height': height, 'size.width': width } }
    );
  }

  async deleteAd (name) {
    const adsCollection = await this.collections.AdsCollection();
    await validateAdExists(name, adsCollection);

    return adsCollection.deleteOne({ name: name });
  }
}

async function validateAdDoesNotAlreadyExists (name, adsCollection) {
  const ad = await adsCollection.findOne({ name: name });
  if (ad) throw new Error('Ad with name ' + name + ' already exists. Please use a new name.');
}

async function validateAdExists (name, adsCollection) {
  const ad = await adsCollection.findOne({ name: name });
  if (!ad) throw new Error('Ad with name ' + name + ' does not exists.');
}