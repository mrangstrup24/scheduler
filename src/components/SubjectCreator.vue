<script setup>
    import {reactive} from 'vue';

    const subjectState = reactive({
      subject: "",
      invalid: null,
      errMsg: "",
    });

    const createSubject = () => {
        subjectState.invalid = null;
        if (subjectState.subject !== "") {
            emit('create-subject', subjectState.subject);
            subjectState.subject = "";
            return;
        }
        subjectState.invalid = true;
        subjectState.errMsg = "Value cannot be empty";
    }

    const emit = defineEmits(["create-subject"]);
</script>

<template>
    <div>
        <label for="input">Subject Input</label> <br>
        <input id="input" type="text" v-model="subjectState.subject"/>
        <button @click="createSubject()">
            <slot>Create</slot>
        </button> <br>
        <p v-if="subjectState.invalid" subject="err-msg">{{ subjectState.errMsg }}</p>
    </div>
</template>