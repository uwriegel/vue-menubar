<template>
    <div>
        <h1>Das ist die Testkomponente</h1>
        <p>Hier kommt der Inhalt</p>
        <div>{{test}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return { test: "Saugut!!" }
    }
}
</script>

<style scoped>
div {
    background-color: orange;
}
</style>
