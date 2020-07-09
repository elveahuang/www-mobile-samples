const Message = {
    template : `
        <div>Message Component</div>
    `,
    setup() {
        const message = VueCompositionAPI.ref('Vue Composition API');
        VueCompositionAPI.onMounted(() => {
            console.log('Message is mounted.');
        });
        return {
            message : VueCompositionAPI.computed(() => message.value),
        };
    }
}
