<script setup>
    const props = defineProps({
        homeroom: {
            type: Object,
            required: true,
        },
        index: {
          type: Number,
          required: true,
        }
    });

    defineEmits(["edit-homeroom", "update-homeroom", "update-homeroom-grade", "delete-homeroom", "option-homeroom"]);
</script>

<template>
    <div style="width: 500px; height: auto; border: 1px solid black; margin: 5px; padding: 5px">
        <input v-if="homeroom.isEditing" type="text" :value="homeroom.homeroom" @input="$emit('update-homeroom', $event.target.value, index)"/>
        <span v-else>
            {{ homeroom.homeroom }}
        </span> <br>
        <div>
            <button v-if="homeroom.isEditing" @click="$emit('edit-homeroom',index)">Done</button>
            <button v-else @click="$emit('edit-homeroom', index)">Edit</button>

            <button v-if="homeroom.isOptioning" @click="$emit('option-homeroom', index)">Done</button>
            <button v-else @click="$emit('option-homeroom', index)">Options</button>

            <button @click="$emit('delete-homeroom', homeroom.id)">Delete</button>

            <div v-if="homeroom.isOptioning">
                <!-- v-model this and save value somehwere -->
                <label for="input1">Grade: </label> 
                <input type="number" id="input1" :value="homeroom.options['grade']" @input="$emit('update-homeroom-grade', $event.target.value, index)"> <br>
            </div>
        </div>
    </div>
</template>