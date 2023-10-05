<script setup>
    import {reactive} from 'vue';

    const teacherState = reactive({
      teacher: "",
      invalid: null,
      errMsg: "",
    });

    const createTeacher = () => {
        teacherState.invalid = null;
        if (teacherState.teacher !== "") {
            emit('create-teacher', teacherState.teacher);
            teacherState.teacher = "";
            return;
        }
        teacherState.invalid = true;
        teacherState.errMsg = "Value cannot be empty";

        this.$parent.setLocalStorage();
    }

    const emit = defineEmits(["create-teacher"]);
</script>

<template>
    <div>
        <label for="input">Teacher Input</label> <br>
        <input id="input" type="text" v-model="teacherState.teacher"/>
        <button @click="createTeacher()">
            <slot>Create</slot>
        </button> <br>
        <p v-if="teacherState.invalid" teacher="err-msg">{{ teacherState.errMsg }}</p>
    </div>
</template>