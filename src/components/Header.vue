<script setup>
    import { RouterLink } from "vue-router";
    import { reactive } from "vue";
</script>

<template>
    <header>
        <h1 style="text-align:center;">Scheduling App</h1>
        <hr>
        <div style="text-align:center; padding-top:5px">
          <RouterLink style="padding-right:5%" to="/">Home</RouterLink>
          <RouterLink style="padding-right:5%" to="/Subjects">Subjects</RouterLink>
          <RouterLink to="/Classes">Classes</RouterLink>
          <RouterLink style="padding-left:5%" to="/Teachers">Teachers</RouterLink>
          <RouterLink style="padding-left:5%" to="/Export">Export</RouterLink>
        </div>
    </header>
</template>