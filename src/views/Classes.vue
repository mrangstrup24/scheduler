<script setup>
    import {ref,watch,computed} from 'vue';
    import {uid} from 'uid';
    
    import TimeTable from '../components/TimeTable.vue';
    import ClassCreator from '../components/ClassCreator.vue';
    import ClassItem from '../components/ClassItem.vue';

    const homeroomClassList = ref([]);
    const timeTableList = ref([]);

    const createClass = (homeroom) => {
        homeroomClassList.value.push({
            id: uid(),
            homeroom,
            isEditing: null,
            isOptioning: null,
            options: {  
                "grade":null, 
                "subjectCount":{},
            }
        });
        setLocalStorage();
    };

    const fetchData = () => {
        const savedHomerooms = JSON.parse(localStorage.getItem("homerooms"))
        const savedTimeTable = JSON.parse(localStorage.getItem("timetable"))
        if (savedHomerooms) {
            homeroomClassList.value = savedHomerooms
        }
        if (savedTimeTable) {
            timeTableList.value = savedTimeTable
        }
    }
    fetchData();

    const setLocalStorage = () => {
        localStorage.setItem("homerooms", JSON.stringify(homeroomClassList.value))
        $cookies.set("homerooms", JSON.stringify(homeroomClassList.value))
        localStorage.setItem("timetable", JSON.stringify(timeTableList.value))
        $cookies.set("timetable", JSON.stringify(timeTableList.value))
    }

    const toggleEditHomeroom = (hrPos) => {
        homeroomClassList.value[hrPos].isEditing = !homeroomClassList.value[hrPos].isEditing
        setLocalStorage();
    };

    const toggleOptionsHomeroom = (hrPos) => {
        homeroomClassList.value[hrPos].isOptioning = !homeroomClassList.value[hrPos].isOptioning
        setLocalStorage();
    };

    const updateHomeroom = (hrVal, hrPos) => {
        homeroomClassList.value[hrPos].homeroom = hrVal
        setLocalStorage();
    }

    const deleteHomeroom = (hrId) => {
        homeroomClassList.value = homeroomClassList.value.filter((homeroom) => homeroom.id !== hrId)
        setLocalStorage();
    }

    const updateHomeroomGrade = (hrVal, hrPos) => {
        homeroomClassList.value[hrPos].options.grade = hrVal
        setLocalStorage();
    }

    const updateTimeTable = (tpVal, tpPos) => {
        if (timeTableList.value[tpPos] == undefined) {
            timeTableList.value.push({id: uid(), timePoint: tpVal})
        }
        else { 
            timeTableList.value[tpPos].timePoint = tpVal 
        }

        timeTableList.value.forEach((timePt) => { if(timePt.timePoint == "") timeTableList.value.splice(timeTableList.value.indexOf(timePt),1)})
        setLocalStorage();
    }
</script>

<template>
    <main>
        <h1>Classes</h1>
        <ClassCreator @create-class="createClass"/>
        <ul>
            <ClassItem v-for="(homeroom, index) in homeroomClassList.slice().reverse()" :homeroom="homeroom" :index="(homeroomClassList.length-1)-index" :key="homeroom.id" @edit-homeroom="toggleEditHomeroom" @update-homeroom="updateHomeroom" @delete-homeroom="deleteHomeroom" @option-homeroom="toggleOptionsHomeroom" @update-homeroom-grade="updateHomeroomGrade"/>
        </ul>
        <h1>Time Table</h1>
        <p>
            Please format the input fields as so: <br>
            {First 3 Letters of Weekday} {Starting Time}-{End Time} <br>
            Example: <br>
            "Thu 8:00-8:40"</p>
        <TimeTable :timeTable=timeTableList @update-time-table="updateTimeTable"></TimeTable>
    </main>
</template>
