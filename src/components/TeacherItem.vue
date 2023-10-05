<script setup>
    import {ref} from 'vue';

    const props = defineProps({
        teacher: {
            type: Object,
            required: true,
        },
        index: {
          type: Number,
          required: true,
        },
    });

    const returnArray = ref([]);

    props.teacher.options['subjectsTaught'].forEach((el) => returnArray.value.push(el))

    const updateReturnArray = (val, pos) => {
        console.log(val + " " + pos)
        if(pos > returnArray.value.length-1) returnArray.value.push(val)
        else {
            returnArray.value[pos] = val
        }
        returnArray.value.forEach((el) => { if(el == "") returnArray.value.splice(returnArray.value.indexOf(el),1)})
    }

    defineEmits(["edit-teacher", "update-teacher", "update-teacher-grade", "delete-teacher", "option-teacher", "update-teacher-options"]);
</script>

<template>
    <div style="width: auto; height: auto; border: 1px solid black; margin: 5px; padding: 5px">
        <input v-if="teacher.isEditing" type="text" :value="teacher.teacher" @input="$emit('update-teacher', $event.target.value, index)"/>
        <span v-else>
            {{ teacher.teacher }}
        </span> <br>
        <div>
            <button v-if="teacher.isEditing" @click="$emit('edit-teacher',index)">Done</button>
            <button v-else @click="$emit('edit-teacher', index)">Edit</button>

            <button v-if="teacher.isOptioning" @click="$emit('option-teacher', index)">Done</button>
            <button v-else @click="$emit('option-teacher', index)">Options</button>

            <button @click="$emit('delete-teacher', teacher.id)">Delete</button>

            <div v-if="teacher.isOptioning">
                <label for="input1">Subjects Taught: </label> 
                <div style="display: flex; flex-direction:column; height:auto; overflow-y: auto;">
                    <input type="text" v-for="(subject, index) in returnArray" :index="index" :key="index" :value="subject" @input="updateReturnArray($event.target.value, index); $emit('update-teacher-options', returnArray, props.index, 'subjectsTaught')">
                    <input type="text" @keydown.enter="updateReturnArray($event.target.value, returnArray.length);$emit('update-teacher-options', returnArray, props.index,'subjectsTaught'); $event.target.value = ''">
                </div>
            </div>
        </div>
    </div>
</template>


                <!-- <div v-for="(subject, index) in subjectList" id="input1" :key="subject.id">
                    <input type="checkbox" @input="$emit('update-teacher-grade', $event.target.value, index)">
                    <p>{{ subjectList.value }}</p>
                </div> -->
                <!-- <input v-for="(subject) in subjectList" type="checkbox" id="input1" :value="teacher.options.grade" :key="subject" @input="$emit('update-teacher-grade', $event.target.value, index)"> <br> -->