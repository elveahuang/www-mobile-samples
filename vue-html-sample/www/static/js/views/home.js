const Home = {
    template : `
        <div>
            Hello {{ message }}
            <v-message></v-message>
        </div>
    `,
    setup() {
        const message = VueCompositionAPI.ref('Vue Composition API');
        VueCompositionAPI.onMounted(() => {
            console.log('Home Page is mounted.');
        });
        return {
            message : VueCompositionAPI.computed(() => message.value),
        };
    }
}
