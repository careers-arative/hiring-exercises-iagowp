export default class GetDashboardDataUseCase {
  constructor (collections) {
    this.collections = collections;
  }
  
  async calculateDashboardData (userId, startDate, endDate) {
    const demandProviderDataCollection = await this.collections.DemandProviderReportsCollection();
    const customDataCollection = await this.collections.CustomReportsCollection();

    const a = await demandProviderDataCollection.find({ date: { $lt: startDate, $gte: endDate }, userId: userId }).toArray();
    let b;
    customDataCollection.find({ date: { $lt: startDate, $gte: endDate }, userId: userId }).toArray()
      .then(data => b = data);

    const reports = a.concat(b);
    
    var dates = [];
    // Strip hours minutes seconds etc.
    var currentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    while (currentDate <= endDate) {
      dates.push(currentDate);

      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1, // Will increase month if over range
      );
    }

    return dates.map(d => {
      const reportsForDay = reports.filter(report => report.date === d);
      // For a clarification about some terms go to the README.md
      return {
        date: d.format('YYYY-MM-DD'),
        earnings: reportsForDay.reduce((a, c) => (c.earnings || 0) + a),
        impressions: reportsForDay.reduce((a, c) => (c.impressions || 0) + a),
        cpm: (reportsForDay.reduce((a, c) => (c.earnings || 0) + a) / reportsForDay.reduce((a, c) => (c.impressions || 0) + a)) * 100,
        ctr: reportsForDay.reduce((a, c) => (c.clicks || 0) + a) / reportsForDay.reduce((a, c) => (c.earnings || 0) + a)
      };
    });
  }
}
