import Vue from 'vue';
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker';
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(AirbnbStyleDatepicker, {
  sundayFirst: true,
});

new Vue({
  render: h => h(App),
}).$mount('#app');
