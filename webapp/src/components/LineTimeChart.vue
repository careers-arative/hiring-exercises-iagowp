<template>
  <div>
    Chart
  </div>
  <div class="relative w-full h-full">
    <canvas :id="id" ref="canvasNode" class="w-full h-full"/>
  </div>
</template>

<script>
import Chart from "chart.js";
import moment from "moment";

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    datasets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartInstance: {}
    };
  },
  mounted() {
    var timeFormat = "MM/DD/YYYY HH:mm";

    function newDateString(days) {
      return moment()
        .add(days, "d")
        .format(timeFormat);
    }

    // Dummy data while we connect this with the API: WIP
    var config = {
      type: "line",
      data: {
        datasets: [
          {
            label: "Dataset name",
            backgroundColor: "rgba(54, 162, 235, 0.3)",
            borderColor: "rgba(54, 162, 235, 0.8)",
            fill: false,
            data: [
              {
                x: newDateString(0),
                y: 7
              },
              {
                x: newDateString(5),
                y: 1
              },
              {
                x: newDateString(7),
                y: 6
              },
              {
                x: newDateString(15),
                y: 2
              }
            ]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                parser: timeFormat,
                tooltipFormat: "ll"
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Multiple scales"
              }
            }
          ]
        }
      }
    };

    this.chartInstance = new Chart(this.$refs.canvasNode, config);
  }
};
</script>
