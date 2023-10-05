<script setup>
    import {ref,watch,computed} from 'vue';
    import {uid} from 'uid';
    
    import SubjectCreator from '../components/SubjectCreator.vue';
    import SubjectItem from '../components/SubjectItem.vue';

    const subjectList = ref([]);

    const createSubject = (subject) => {
        subjectList.value.push({
            id: uid(),
            subject,
            isEditing: null,
            isOptioning: null,
            options: {  
                "minimumRequired":0, 
                "consecutiveClassesCount":0,
                "consecutiveClassesLength":0,
                "wholeGrade":0,
            }
        });
        setLocalStorage();
    };

    const fetchData = () => {
        const savedSubjects = JSON.parse(localStorage.getItem("subjects"))
        if (savedSubjects) {
            subjectList.value = savedSubjects
        }
    }
    fetchData();

    const setLocalStorage = () => {
        localStorage.setItem("subjects", JSON.stringify(subjectList.value))
        $cookies.set("subjects", JSON.stringify(subjectList.value))
        // if(subjectList){
        //     $cookies.set('subjects', subjectList, "9999d")
        // }
    }

    const toggleEditSubject = (sbjPos) => {
        subjectList.value[sbjPos].isEditing = !subjectList.value[sbjPos].isEditing
        setLocalStorage();
    };

    const toggleOptionsSubject = (sbjPos) => {
        subjectList.value[sbjPos].isOptioning = !subjectList.value[sbjPos].isOptioning
        setLocalStorage();
    };

    const updateSubject = (sbjVal, sbjPos) => {
        subjectList.value[sbjPos].subject = sbjVal
        setLocalStorage();
    }

    const deleteSubject = (sbjId) => {
        subjectList.value = subjectList.value.filter((subject) => subject.id !== sbjId)
        setLocalStorage();
    }

    const updateSubjectOptions = (sbjVal, sbjPos, sbjType) => {
        subjectList.value[sbjPos].options[sbjType] = sbjVal
        setLocalStorage();
    }
</script>

<template>
    <main>
        <h1>Subjects</h1>
        <SubjectCreator @create-subject="createSubject"/>
        <ul>
            <SubjectItem v-for="(subject, index) in subjectList.slice().reverse()" :subject="subject" :index="(subjectList.length-1)-index" :key="subject.id" @edit-subject="toggleEditSubject" @update-subject="updateSubject" @delete-subject="deleteSubject" @option-subject="toggleOptionsSubject" @update-subject-options="updateSubjectOptions"/>
        </ul>
    </main>
</template>
