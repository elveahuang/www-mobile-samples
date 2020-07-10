function setupApp() {
    Vue.use(VueCompositionAPI.default);
    Vue.use(Quasar);
    Vue.component("v-message", Message);
    Vue.config.productionTip = false;
}
