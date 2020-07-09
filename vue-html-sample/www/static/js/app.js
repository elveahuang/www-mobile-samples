function setupApp() {
    Vue.use(VueCompositionAPI.default);
    Vue.component("v-message", Message);
    Vue.config.productionTip = false;
}
