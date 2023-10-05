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

export const createSchedule = () =>
{
    //sets up ret as the schedule structure
    const ret = []
    timeTable.forEach(timePt => {
        ret[timePt] = {}
        electiveTeacherList.forEach(teacher => {
            ret[timePt][teacher.name] = []
        })
    })

    const shuffledTimeTable = shuffle(JSON.parse(JSON.stringify(timeTable)))

    //whole grade classes
    for (let gradeIter = 1; gradeIter <= 5; gradeIter++) {
        const wholeGradeCount = JSON.parse(JSON.stringify(EMPTY_SUBJECT_COUNT))

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
                            if(hr.subjectCount[subj] - options.wholeGrade[subj] /* << This might be a problem in the future, replace with a 'before' total count or other solution*/ != options.consecutive[subj].count * options.consecutive[subj].length) throw 'Was unable to randomly fill consecutive classes into time points! Try to reduce consecutive class length or generate again.'; 
                            //maybe edge cases where 1 homeroom is unable to get a consecutive class but user still allows it
                        })
                    }
                })
            }
        })
    
    }           

    //individual classes
    for (let gradeIter = 1; gradeIter <= 5; gradeIter++) {
        subjects.forEach(subj => { 
            electiveTeacherList.forEach(teacher => {
                if(teacher.subject.includes(subj)){
                    homeroomClassList.forEach(hr => { 
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
                if(hr.subjectCount[subj] != requiredClasses[subj]) throw "Was unable to randomly fill individual classes into time points! Try to add more teachers, reduce required classes, reduce homeroom classes, or generate again."; 
                //maybe edge cases where 1 homeroom is unable to get a consecutive class but user still allows it
            })
        })
        
    return ret
    }
}



console.log(createSchedule())
