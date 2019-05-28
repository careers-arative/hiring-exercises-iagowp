/**
 * Used to get data from BE
 */

/**
 * Requests impresions, earnings, ctr and cpm for the given range of dates
 * @param {String} startDateString (YYYY-MM-DD)
 * @param {String} endDateString (YYYY-MM-DD)
 */
const getPerformanceData = (startDateString, endDateString) => {
  return fetch('/api/v0/performance/' + startDateString + '/' + endDateString + '')
    .catch(error => ({
      success: false,
      error,
    }))
    .then(res => res.json());
};

export default {
  getPerformanceData,
};
