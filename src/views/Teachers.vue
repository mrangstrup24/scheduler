<script setup>
    import {ref,watch,computed} from 'vue';
    import {uid} from 'uid';
    
    import TeacherCreator from '../components/TeacherCreator.vue';
    import TeacherItem from '../components/TeacherItem.vue';

    const teacherList = ref([]);
    const subjectList = ref([]);


    const createTeacher = (teacher) => {
        teacherList.value.push({
            id: uid(),
            teacher,
            isEditing: null,
            isOptioning: null,
            options: {  
                "subjectsTaught":[],
            }
        });
    };

    const fetchData = () => {
        const savedTeachers = JSON.parse(localStorage.getItem("teachers"))
        if (savedTeachers) {
            teacherList.value = savedTeachers
        }
        // if ($cookies.get("subjects")){
        //     subjectList.value = $cookies.get("subjects")
        // }
    }
    fetchData();

    const setLocalStorage = () => {
        localStorage.setItem("teachers", JSON.stringify(teacherList.value))
        $cookies.set("teachers", JSON.stringify(teacherList.value))
    }

    const toggleEditTeacher = (tchPos) => {
        teacherList.value[tchPos].isEditing = !teacherList.value[tchPos].isEditing
        setLocalStorage();
    };

    const toggleOptionsTeacher = (tchPos) => {
        teacherList.value[tchPos].isOptioning = !teacherList.value[tchPos].isOptioning
        setLocalStorage();
    };

    const updateTeacher = (tchVal, tchPos) => {
        teacherList.value[tchPos].teacher = tchVal
        setLocalStorage();
    }

    const deleteTeacher = (tchId) => {
        teacherList.value = teacherList.value.filter((teacher) => teacher.id !== tchId)
        setLocalStorage();
    }

    const updateTeacherOptions = (tchVal, tchPos, tchType) => {
        teacherList.value[tchPos].options[tchType] = tchVal
        setLocalStorage();
    }
</script>

<template>
    <main>
        <h1>Teachers</h1>
        <TeacherCreator @create-teacher="createTeacher"/>
        <ul>
            <TeacherItem v-for="(teacher, index) in teacherList.slice().reverse()" :teacher="teacher" :index="(teacherList.length-1)-index" :key="teacher.id" @edit-teacher="toggleEditTeacher" @update-teacher="updateTeacher" @delete-teacher="deleteTeacher" @option-teacher="toggleOptionsTeacher" @update-teacher-options="updateTeacherOptions"/>
        </ul>
    </main>
</template>
