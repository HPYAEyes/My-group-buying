import Vue from 'vue'
import moment from 'moment';
import 'moment/locale/zh-cn';

export default () => {
  Vue.prototype.$moment = moment;
  Vue.prototype.$moment.locale('zh-cn')
}
