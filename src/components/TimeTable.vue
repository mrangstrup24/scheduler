<script setup>
    const props = defineProps({
        timeTable:Object,
    })

    defineEmits(["update-time-table"])
</script>

<template>
    <div style="display: flex; flex-direction:column; height:250px; overflow-y: auto;">
        <input type="text" v-for="(timePoint, index) in props.timeTable" :timePoint="timePoint" :index="index" :key="timePoint.id" :value="timePoint.timePoint" @input="$emit('update-time-table', $event.target.value, index)">
        <input type="text" @keydown.enter="$emit('update-time-table', $event.target.value, props.timeTable.length); $event.target.value = ''">
    </div>
</template>