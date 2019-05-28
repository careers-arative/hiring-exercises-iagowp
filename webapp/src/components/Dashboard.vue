<template>
  <div class="relative h-screen flex flex-col p-4">
    <h1 class="title flex-none">Ads Performance</h1>
    <div class="flex-none flex flex-col sm:flex-row-reverse sm:items-center sm:justify-between">
      <div class="dates my-4 sm:my-0">
        <div>
          <date-picker @change="onDateRangeChange"/>
        </div>
      </div>
      <div class="toggles sm:flex sm:flex-row">
        <checkbox id="showCPM" label="CPM" class="w-1/2 sm:w-auto"/>
        <checkbox id="showCTR" label="CTR" class="w-1/2 sm:w-auto"/>
        <checkbox id="showEarnings" label="Earnings" class="w-1/2 sm:w-auto"/>
        <checkbox id="showImpressions" label="Impressions" class="w-1/2 sm:w-auto"/>
      </div>
    </div>
    <div class="min-h-0 flex-grow mt-4">
      <div class="w-full h-full flex items-center justify-center rounded shadow-md">
        <div v-if="chartDatasets.length === 0">
          <p class="opacity-25 font-bold text-center">Please select a date range.</p>
          <p v-if="!isMobile" class="opacity-25 text-center">(Top right corner)</p>
        </div>
        <line-time-chart v-else id="performanceChart" :datasets="chartDatasets"/>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "./Checkbox.vue";
import DatePicker from "./DatePicker.vue";
import LineTimeChart from "./LineTimeChart.vue";
import API from "../utils/API";

export default {
  name: "Dashboard",
  components: {
    Checkbox,
    DatePicker,
    LineTimeChart
  },
  data() {
    return {
      isMobile: false,
      startDate: "",
      endDate: "",
      chartDatasets: null
    };
  },
  mounted() {
    window.addEventListener("resize", this.checkIsMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkIsMobile);
  },
  methods: {
    checkIsMobile() {
      console.log("Checking");
      this.isMobile = window.innerWidth < 640;
    },
    onDateRangeChange(startDate, endDate) {
      this.startDate = startDate;
      this.endDate = endDate;

      // Get data from API
      API.getPerformanceData(startDate, endDate).then(
        ({ success, error, data }) => {
          if (error) console.log(error)
        }
      );
    },
    /*
      data is an array of objects with the following format:
      {
        date: string,
        earnings: number,
        impressions: number,
        ctr: number,
        cpm: number
      }
    */
    buildDatasets(data) {}
  }
};
</script>

<style scoped lang="scss">
.title {
  font-size: 1.4rem;
  font-weight: bold;
}
</style>
