<template>
    <div>
        <h1>{{name}}</h1>
        <h6>{{description}}</h6>
    </div>

</template>

<script>
    export default {
        name: 'lists',
        props: ["name", "description"],
        data() {
            return {}
        },
        computed: {
          

        },
        methods: {},
        components: {}
    }
</script>

<style>
</style>