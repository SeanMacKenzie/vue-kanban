<template>
    <div>
        <h2>{{name}}</h2>
        <h5>{{description}}</h5>
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