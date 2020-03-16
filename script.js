//Add To Do

// 1. select input
let input = document.querySelector("input");
let ul = document.querySelector(".list");
let left = document.querySelector(".itemsleft");
let all = document.querySelector(".all");
let completed = document.querySelector(".completed");
let active = document.querySelector(".active");
let clear = document.querySelector(".clear");

let id = 0;
let data = [];


// add eventlistener to input keyup
input.addEventListener("keyup", addTodo); 

// Check if keycode is 13 
function addTodo(e){
if(e.keyCode === 13){
    const obj =  {
        text: input.value,
        checked: false,
        id: id++
    };
    data.push(obj);
    createUI(data);
    input.value = "";
}

}

function deleteTodo(e){
    let id = +e.target.parentElement.dataset.uid; //typeof  id is string 
    let index = data.findIndex(el => el.id === id);
    
   
    data.splice(index, 1);
    createUI(data);
}


function Toggletodo(e){
    let id = +e.target.parentElement.dataset.uid;
    data = data.map(todo => {
        if (todo.id === id){
            todo.checked = !todo.checked
        }
        return todo
    } );
    createUI(data);
  
}

function leftitems() {
    let itemsleft = data.filter(e => !e.checked);
    left.innerText = `${itemsleft.length} items left`;
}

function showall() {
    createUI(data);

}

function showcompleted() {
    let completeditems = data.filter(e => e.checked);
    createUI(completeditems);
}

function showactive() {
    let activeitems = data.filter(e => !e.checked);
    createUI(activeitems);
}

function clearcompleted() {
    data = data.filter(e => !e.checked);
    createUI(data);
}



//3. Create UI function todo = [] default is blank array. so that foreach will not break
function createUI(arr = [] ){
    ul.innerHTML = ""; // To clear the previous dom
    


    arr.forEach(arrval => {
        let li = document.createElement("li");
        li.setAttribute("data-uid" , arrval.id);
        let input = document.createElement("input");
        input.type = "checkbox";
        input.addEventListener("click" , Toggletodo);
        input.checked = arrval.checked;
        let p = document.createElement("p");
        p.innerText = arrval.text;
        let span = document.createElement("span");
        span.innerText = "X";
        span.addEventListener("click" , deleteTodo);
        li.append(input, p, span);
        ul.append(li);

    });

    leftitems();
   
}

createUI(data);




all.addEventListener("click", showall);

completed.addEventListener("click", showcompleted);

active.addEventListener("click" , showactive);

clear.addEventListener("click" , clearcompleted);

