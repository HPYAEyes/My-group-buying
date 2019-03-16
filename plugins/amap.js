import Vue from 'vue'
import VueAMap from 'vue-amap'

export default () => {
  Vue.use(VueAMap);
  VueAMap.initAMapApiLoader({
    key: '79e721e2dd35b49aa2a1a3a17d038451',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    uiVersion: '1.0.11',
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
  });
}
