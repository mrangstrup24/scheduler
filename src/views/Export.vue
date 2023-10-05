<script setup>
    class ElectiveTeacher {
        constructor(name, subject, possible_times){
        this.name = name;
        this.subject = subject;
        this.possible_times = possible_times;
        }
    }

    class HomeroomClass {
        constructor(supervisor, grade) {
        this.supervisor = supervisor;
        this.grade = grade;
        this.subjectCount = JSON.parse(JSON.stringify(EMPTY_SUBJECT_COUNT));
        }
    }
    
    const subjects = []

    const EMPTY_SUBJECT_COUNT = {}

    const timeTable = []

    const requiredClasses = {}

    const electiveTeacherList = []

    const homeroomClassList = []

    const options =
    {
        consecutive : {},
        wholeGrade : {}
    }



    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    var check = false
    var somethingDone = false
    var alreadyFilled = false
    var failed = false
    var errMsg = ""

    const createSchedule = () =>
    {
        //sets up ret as the schedule structure
        let ret = []
        timeTable.forEach(timePt => {
            ret[timePt] = {}
            electiveTeacherList.forEach(teacher => {
                ret[timePt][teacher.name] = []
            })
        })

        const shuffledTimeTable = shuffle(JSON.parse(JSON.stringify(timeTable)))
        check = false

        //whole grade classes
        for (let gradeIter = 1; gradeIter <= 5; gradeIter++) {
            var wholeGradeCount = JSON.parse(JSON.stringify(EMPTY_SUBJECT_COUNT))

            subjects.forEach(subj => { 
                if(options.wholeGrade[subj] > wholeGradeCount[subj]) {
                    electiveTeacherList.forEach(teacher => {
                        if(teacher.subject.includes(subj)){
                            shuffledTimeTable.forEach(timePt => {
                                somethingDone = false
                                homeroomClassList.forEach(hr => { 
                                    if (hr.grade == gradeIter &&
                                        options.wholeGrade[subj] > wholeGradeCount[subj] && 
                                        (ret[timePt][teacher.name].every(e => homeroomClassList[homeroomClassList.findIndex(i => i.supervisor == e)].grade == gradeIter ) ||
                                        ret[timePt][teacher.name].length == 0)){
                                            ret[timePt][teacher.name].push(hr.supervisor)
                                            hr.subjectCount[subj]++
                                            somethingDone = true
                                    }
                                })
                                if(somethingDone) wholeGradeCount[subj]++
                            })
                        }
                    })
                }
            })
        }

        //consecutive classes
        for (let gradeIter = 1; gradeIter <= 5; gradeIter++) {
            subjects.forEach(subj => { 
                if(options.consecutive[subj].count > 0) {
                    electiveTeacherList.forEach(teacher => {
                        if(teacher.subject.includes(subj)){
                            homeroomClassList.forEach(hr => { 
                                shuffledTimeTable.forEach(timePt => {
                                    check = true

                                    for (let i = 0; i < options.consecutive[subj]['length']; i++) { 
                                        if( timeTable[timeTable.indexOf(timePt)+i] == undefined ) check = false //Check if consecutive class exists (last one)
                                        else if(ret[timeTable[timeTable.indexOf(timePt)+i]][teacher.name].length != 0) check = false //Check consecutive classes are empty
                                        else if(timePt.substring(0,2) != timeTable[timeTable.indexOf(timePt)+i].substring(0,2)) check = false //Check if the consecutive classes occur on the same day
                                    }
                                    electiveTeacherList.forEach(tchr => {
                                        if(ret[timePt][tchr.name].includes(hr.supervisor)) check = false //Check if a teacher is not already teaching that hr
                                    })
                                        
                                    

                                    if(hr.subjectCount[subj] < options.consecutive[subj].count * options.consecutive[subj].length && check){
                                        for (let i = 0; i < options.consecutive[subj].length; i++) { 
                                            ret[ timeTable[ timeTable.indexOf(timePt)+i ] ][teacher.name].push(hr.supervisor)
                                            hr.subjectCount[subj]++
                                        }
                                    }
                                })
                                if(hr.subjectCount[subj] - options.wholeGrade[subj] /* << This might be a problem in the future, replace with a 'before' total count or other solution*/ != options.consecutive[subj].count * options.consecutive[subj].length) { 
                                    failed = true
                                    errMsg = "Was unable to randomly fill consecutive classes into time points! Try to reduce consecutive class length or generate again."
                                    // throw 'Was unable to randomly fill consecutive classes into time points! Try to reduce consecutive class length or generate again.'; 
                                }
                                //maybe edge cases where 1 homeroom is unable to get a consecutive class but user still allows it
                            })
                        }
                    })
                }
            })
        
        }          

        if(failed) return {status:0,data:errMsg}

        //individual classes
        for (let gradeIter = 1; gradeIter <= 5; gradeIter++) {
            subjects.forEach(subj => { 
                electiveTeacherList.forEach(teacher => {
                    if(teacher.subject.includes(subj)){
                        homeroomClassList.forEach(hr => { 
                            console.log(JSON.stringify(requiredClasses))
                            if(hr.subjectCount[subj] < requiredClasses[subj]){
                                alreadyFilled = false
                                shuffledTimeTable.forEach(timePt => {
                                    if (!alreadyFilled){
                                        check = true

                                        if(ret[timePt][teacher.name].length != 0) check = false //Check if that timespot is not already taken
                                        electiveTeacherList.forEach(tchr => {
                                            if(ret[timePt][tchr.name].includes(hr.supervisor)) check = false //Check if a teacher is not already teaching that hr
                                        })

                                        if(check){
                                            ret[timePt][teacher.name].push(hr.supervisor)
                                            hr.subjectCount[subj]++
                                        }

                                        if(hr.subjectCount[subj] >= requiredClasses[subj]) alreadyFilled = true
                                    }
                                })
                            }
                        })
                    }
                })
            })

            
            subjects.forEach(subj => { 
                homeroomClassList.forEach(hr => { 
                    console.log(hr.subjectCount[subj])
                    console.log(requiredClasses[subj])
                    if(hr.subjectCount[subj] != requiredClasses[subj]) {
                        console.log("Problem:")
                        // throw "Was unable to randomly fill individual classes into time points! Try to add more teachers, reduce required classes, reduce homeroom classes, or generate again. -- "; 
                        failed = true
                        errMsg = "Was unable to randomly fill individual classes into time points! Try to add more teachers, reduce required classes, reduce homeroom classes, or generate again."
                    }
                    //maybe edge cases where 1 homeroom is unable to get a consecutive class but user still allows it
                })
            })
            
            if(failed) return {status:0,data:errMsg}

            return {status: 1, data: ret}
        }
    }

    const ls_subjects = JSON.parse(localStorage.getItem('subjects'))
    const ls_timetable = JSON.parse(localStorage.getItem('timetable'))
    const ls_teachers = JSON.parse(localStorage.getItem('teachers'))
    const ls_homerooms = JSON.parse(localStorage.getItem('homerooms'))
    

    if(ls_subjects){
        ls_subjects.forEach((el) => {
            subjects.push(el.subject)
            requiredClasses[el.subject] = el.options.minimumRequired
            options.consecutive[el.subject] = {'count':el.options.consecutiveClassesCount, 'length':el.options.consecutiveClassesLength}
            options.wholeGrade[el.subject] = el.options.wholeGrade
        })
    }
    else {
        console.log("error 1")
    }


    subjects.forEach(e => EMPTY_SUBJECT_COUNT[e] = 0)

    if(ls_timetable){
        ls_timetable.forEach((el) => {
            timeTable.push(el.timePoint)
        })
    }
    else {
        console.log("error 1")
    }

    if(ls_teachers){
        ls_teachers.forEach((el) => {
            electiveTeacherList.push(new ElectiveTeacher(el.teacher, el.options.subjectsTaught, ""))
        })
    }
    else {
        console.log("error 2")
    }

    if(ls_homerooms){
        ls_homerooms.forEach((el) => {
            homeroomClassList.push(new HomeroomClass(el.homeroom, el.options.grade, {}))
        })
    }
    else {
        console.log("error 3")
    }

    const scheduleData = createSchedule(timeTable, subjects, EMPTY_SUBJECT_COUNT, requiredClasses, electiveTeacherList, homeroomClassList, options)

</script>

<template>
    <main>
        <h1>
            Export
        </h1>
        <!-- <h2>
            Status:
        </h2>
        <p>sucess</p>
        <button>Export Timetable as CSV</button> <br>
        <button>Export and View Timetable as a Table</button> <br>
        <button>Download Raw Data</button> <br>
        <button>View Raw Data</button> -->
        <div v-if="scheduleData.status==1">
            <code v-for="tp in ls_timetable" :key="tp.id">{{ tp.timePoint + ": " + JSON.stringify(scheduleData.data[tp.timePoint]) }} <br> </code>
        </div>
        <p v-else> {{ scheduleData.data }} </p>
    </main>
</template>
