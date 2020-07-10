const Home = {
    template : `
        <div>
            Hello {{ message }}
            <v-message></v-message>
            <q-card class="my-card">
                <q-card-section>
                    {{ message }}
                    <q-btn icon="mdi-alert-circle-outline"/>
                </q-card-section>
            </q-card>
        </div>
    `,
    setup() {
        const message = VueCompositionAPI.ref('Vue Composition API');
        VueCompositionAPI.onMounted(() => {
            console.log('Home Page is mounted.');
        });
        return {
            icons : {},
            message : VueCompositionAPI.computed(() => message.value),
        };
    }
}
