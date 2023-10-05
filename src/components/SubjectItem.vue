<script setup>
    const props = defineProps({
        subject: {
            type: Object,
            required: true,
        },
        index: {
          type: Number,
          required: true,
        }
    });

    defineEmits(["edit-subject", "update-subject", "update-subject-options", "delete-subject", "option-subject"]);
</script>

<template>
    <div style="width: 500px; height: auto; border: 1px solid black; margin: 5px; padding: 5px">
        <input v-if="subject.isEditing" type="text" :value="subject.subject" @input="$emit('update-subject', $event.target.value, index)"/>
        <span v-else>
            {{ subject.subject }}
        </span> <br>
        <div>
            <button v-if="subject.isEditing" @click="$emit('edit-subject',index)">Done</button>
            <button v-else @click="$emit('edit-subject', index)">Edit</button>

            <button v-if="subject.isOptioning" @click="$emit('option-subject', index)">Done</button>
            <button v-else @click="$emit('option-subject', index)">Options</button>

            <button @click="$emit('delete-subject', subject.id)">Delete</button>

            <div v-if="subject.isOptioning">
                <label for="input1">Minimum # of Classes: </label> 
                <input type="number" id="input1" :value="subject.options['minimumRequired']" @input="$emit('update-subject-options', $event.target.value, index, 'minimumRequired')"> <br>
                <label for="input2"># of Consecutive Classes: </label> 
                <input type="number" id="input2" :value="subject.options['consecutiveClassesCount']" @input="$emit('update-subject-options', $event.target.value, index, 'consecutiveClassesCount')"> <br>
                <label for="input3">Length of Consecutive Classes: </label> 
                <input type="number" id="input3" :value="subject.options['consecutiveClassesLength']" @input="$emit('update-subject-options', $event.target.value, index, 'consecutiveClassesLength')"> <br>
                <label for="input4"># of Whole Grade Classes: </label> 
                <input type="number" id="input4" :value="subject.options['wholeGrade']" @input="$emit('update-subject-options', $event.target.value, index, 'wholeGrade')"> <br>
            </div>
        </div>
    </div>
</template>