class Collections {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
  }

  AdsCollection() {
    return this.mongoClient.db().collection("ads");
  }

  DemandProviderReportsCollection() {
    return this.mongoClient.db().collection("demand_provider_reports");
  }

  CustomReportsCollection() {
    return this.mongoClient.db().collection("custom_reports");
  }

}

export default Collections;