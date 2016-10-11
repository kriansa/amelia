<template>
    <h1>My message: {{ message }}</h1>
</template>

<style scoped lang="scss">
    h1 {
        font-size: 16px;
        color: blue;
    }
</style>

<script>
    export default {
        data () {
            return {
                message: 'Hello World!'
            }
        }
    };
</script>
