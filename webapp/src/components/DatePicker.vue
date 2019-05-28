<template>
  <div>
    <div class="datepicker-trigger">
      <input
        type="text"
        id="datepicker-trigger"
        placeholder="Select dates"
        class="border border-gray-500 rounded py-1 px-2 w-full"
        :value="selectedRange"
      >
      <airbnb-style-datepicker
        :trigger-element-id="'datepicker-trigger'"
        :mode="'range'"
        :date-one="startDate"
        :date-two="endDate"
        @date-one-selected="val => { startDate = val }"
        @date-two-selected="val => { endDate = val }"
        :fullscreen-mobile="true"
        :show-action-buttons="false"
        :show-shortcuts-menu-trigger="false"
      />
    </div>
  </div>
</template>

<script>
const format = require("date-fns/format");

export default {
  name: "DatePicker",
  data() {
    return {
      dateFormat: "MMM D",
      startDate: null,
      endDate: null,
    };
  },
  computed: {
    selectedRange() {
      let formattedDates = "";

      if (this.startDate)
        formattedDates = format(this.startDate, this.dateFormat);
      if (this.endDate)
        formattedDates += " - " + format(this.endDate, this.dateFormat);

      if(this.startDate && this.endDate) this.$emit('change', this.startDate, this.endDate);

      return formattedDates;
    }
  }
};
</script>

<style scoped lang="scss">
</style>

