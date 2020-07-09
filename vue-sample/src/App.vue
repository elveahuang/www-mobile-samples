<template>
    <h1>Hello Vue 3!</h1>
</template>

<script lang="ts">
    import {defineComponent, onMounted} from 'vue';

    export default defineComponent({
        setup() {
            onMounted(() => {
                console.log('App onMounted...')
            })
            return {};
        }
    })
</script>
