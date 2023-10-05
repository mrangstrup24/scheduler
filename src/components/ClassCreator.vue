<script setup>
    import {reactive} from 'vue';

    const classState = reactive({
      class: "",
      invalid: null,
      errMsg: "",
    });

    const createClass = () => {
        classState.invalid = null;
        if (classState.class !== "") {
            emit('create-class', classState.class);
            classState.class = "";
            return;
        }
        classState.invalid = true;
        classState.errMsg = "Value cannot be empty";
    }

    const emit = defineEmits(["create-class"]);
</script>

<template>
    <div>
        <label for="input">Class Input</label> <br>
        <input id="input" type="text" v-model="classState.class"/>
        <button @click="createClass()">
            <slot>Create</slot>
        </button> <br>
        <p v-if="classState.invalid" class="err-msg">{{ classState.errMsg }}</p>
    </div>
</template>