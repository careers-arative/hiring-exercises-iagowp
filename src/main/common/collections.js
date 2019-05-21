class Collections {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
  }

  AdsCollection() {
    return this.mongoClient.db().collection("ads");
  }

}

export default Collections;