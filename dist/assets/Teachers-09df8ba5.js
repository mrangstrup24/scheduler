import{u as x}from"./index-3395c5ac.js";import{b as O,o as l,c as u,d as v,e as E,v as S,a as s,f as C,t as y,g as f,h as m,F as T,r as $,w as D,i as N,j}from"./index-2e600749.js";const I=s("label",{for:"input"},"Teacher Input",-1),w=s("br",null,null,-1),V=s("br",null,null,-1),B={key:0,teacher:"err-msg"},L={__name:"TeacherCreator",emits:["create-teacher"],setup(o,{emit:n}){const t=O({teacher:"",invalid:null,errMsg:""}),d=()=>{if(t.invalid=null,t.teacher!==""){n("create-teacher",t.teacher),t.teacher="";return}t.invalid=!0,t.errMsg="Value cannot be empty",this.$parent.setLocalStorage()};return(a,e)=>(l(),u("div",null,[I,v(),w,E(s("input",{id:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=i=>t.teacher=i)},null,512),[[S,t.teacher]]),s("button",{onClick:e[1]||(e[1]=i=>d())},[C(a.$slots,"default",{},()=>[v("Create")])]),v(),V,t.invalid?(l(),u("p",B,y(t.errMsg),1)):f("",!0)]))}},M={style:{width:"auto",height:"auto",border:"1px solid black",margin:"5px",padding:"5px"}},J=["value"],U={key:1},q=s("br",null,null,-1),A={key:4},F=s("label",{for:"input1"},"Subjects Taught: ",-1),K={style:{display:"flex","flex-direction":"column",height:"auto","overflow-y":"auto"}},R=["index","value","onInput"],z={__name:"TeacherItem",props:{teacher:{type:Object,required:!0},index:{type:Number,required:!0}},emits:["edit-teacher","update-teacher","update-teacher-grade","delete-teacher","option-teacher","update-teacher-options"],setup(o){const n=o,t=m([]);n.teacher.options.subjectsTaught.forEach(a=>t.value.push(a));const d=(a,e)=>{console.log(a+" "+e),e>t.value.length-1?t.value.push(a):t.value[e]=a,t.value.forEach(i=>{i==""&&t.value.splice(t.value.indexOf(i),1)})};return(a,e)=>(l(),u("div",M,[o.teacher.isEditing?(l(),u("input",{key:0,type:"text",value:o.teacher.teacher,onInput:e[0]||(e[0]=i=>a.$emit("update-teacher",i.target.value,o.index))},null,40,J)):(l(),u("span",U,y(o.teacher.teacher),1)),v(),q,s("div",null,[o.teacher.isEditing?(l(),u("button",{key:0,onClick:e[1]||(e[1]=i=>a.$emit("edit-teacher",o.index))},"Done")):(l(),u("button",{key:1,onClick:e[2]||(e[2]=i=>a.$emit("edit-teacher",o.index))},"Edit")),o.teacher.isOptioning?(l(),u("button",{key:2,onClick:e[3]||(e[3]=i=>a.$emit("option-teacher",o.index))},"Done")):(l(),u("button",{key:3,onClick:e[4]||(e[4]=i=>a.$emit("option-teacher",o.index))},"Options")),s("button",{onClick:e[5]||(e[5]=i=>a.$emit("delete-teacher",o.teacher.id))},"Delete"),o.teacher.isOptioning?(l(),u("div",A,[F,s("div",K,[(l(!0),u(T,null,$(t.value,(i,h)=>(l(),u("input",{type:"text",index:h,key:h,value:i,onInput:g=>{d(g.target.value,h),a.$emit("update-teacher-options",t.value,n.index,"subjectsTaught")}},null,40,R))),128)),s("input",{type:"text",onKeydown:e[6]||(e[6]=D(i=>{d(i.target.value,t.value.length),a.$emit("update-teacher-options",t.value,n.index,"subjectsTaught"),i.target.value=""},["enter"]))},null,32)])])):f("",!0)])]))}},G=s("h1",null,"Teachers",-1),W={__name:"Teachers",setup(o){const n=m([]);m([]);const t=r=>{n.value.push({id:x(),teacher:r,isEditing:null,isOptioning:null,options:{subjectsTaught:[]}})};(()=>{const r=JSON.parse(localStorage.getItem("teachers"));r&&(n.value=r)})();const a=()=>{localStorage.setItem("teachers",JSON.stringify(n.value)),$cookies.set("teachers",JSON.stringify(n.value))},e=r=>{n.value[r].isEditing=!n.value[r].isEditing,a()},i=r=>{n.value[r].isOptioning=!n.value[r].isOptioning,a()},h=(r,c)=>{n.value[c].teacher=r,a()},g=r=>{n.value=n.value.filter(c=>c.id!==r),a()},b=(r,c,p)=>{n.value[c].options[p]=r,a()};return(r,c)=>(l(),u("main",null,[G,N(L,{onCreateTeacher:t}),s("ul",null,[(l(!0),u(T,null,$(n.value.slice().reverse(),(p,k)=>(l(),j(z,{teacher:p,index:n.value.length-1-k,key:p.id,onEditTeacher:e,onUpdateTeacher:h,onDeleteTeacher:g,onOptionTeacher:i,onUpdateTeacherOptions:b},null,8,["teacher","index"]))),128))])]))}};export{W as default};
