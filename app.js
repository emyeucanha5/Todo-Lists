 // ****** SELECT ITEMS **********
const form = document.querySelector('form');
const inp = document.querySelector('#grocery');
const clearbtn = document.querySelector('.clear-btn');
const alert = document.querySelector('.alert');
const list = document.querySelector('.grocery-list');
const container = document.querySelector('.grocery-container');
const submitBtn = form.querySelector('.submit-btn');
let editElem;
let editFlag = false;
let editID;
function setDefaultValue(){
	submitBtn.innerHTML = "Submit";
	editElem;
	editFlag = false;
	editID;
	inp.value = "";
}

window.addEventListener("DOMContentLoaded",setUpLS);
const duration = 500;

function alertDisplay(action,text){
	alert.classList.add(`alert-${action}`);
	alert.innerHTML = text;
	setTimeout(()=>{
	alert.classList.remove(`alert-${action}`);
	alert.innerHTML = "";
	}, duration);
}

function editElement(values,element, editID){
	const elem = document.querySelector(`article[data-id="${editID}"]`);
	elem.querySelector('.title').innerHTML = values;
	submitBtn.innerHTML = "Submit";
	editFlag = false;
	editLS(editID, values);
}


function addElement(values){
	if(values){
		alertDisplay("success","Item Added To The List");
		// get HTML code and parse it here
		setUpList(values);
		//

        let items = document.querySelectorAll('.grocery-item');
        if(items.length > 0){
		container.classList.add('show-container');
		clearbtn.classList.add('class');
		}else{
			container.classList.remove('show-container');	
		}
	}else{
		alertDisplay("danger","Please Enter Value");
	}
}




form.addEventListener('submit', function(e) {
	e.preventDefault();
	const value = inp.value;
	if(!editFlag){
		addElement(value);
	}else{
		editElement(value, editElem, editID);
	}
	inp.value = "";
});



function setUpList(values){
	const id = new Date().getTime();
	const attr = document.createAttribute("data-id");
	attr.value = id;
	const item = document.createElement("article");
	item.setAttributeNode(attr);
	item.classList.add('grocery-item');
	item.innerHTML = `<p class="title">${values}</p>
      <div class="btn-container">
        <!-- edit btn -->
        <button class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;
    
    addLS(id,values);
    let editbtn = item.querySelector('.edit-btn');
    let deletebtn = item.querySelector('.delete-btn');
   	deletebtn.addEventListener('click',deleteF);
   	editbtn.addEventListener('click',editF);
   	list.appendChild(item);
}

function editF(e){
	const element = e.currentTarget.parentElement.parentElement;
	editFlag = true;
	editID = element.dataset.id;
	editElem = e.currentTarget.parentElement.previousElementSibling;
	submitBtn.innerHTML = "Edit";
	inp.value = editElem.innerHTML;
}
function deleteF(e){
	const item = e.currentTarget.parentElement.parentElement;
	const id = item.dataset.id;
	setDefaultValue();
	list.removeChild(item);
	removeLS(id);
	let grocery = document.querySelectorAll('.grocery-item');
	alertDisplay("danger","Item removed");
	if(grocery.length <= 0){
		container.classList.remove('show-container');
	}
}


clearbtn.addEventListener('click', function(e) {
		let items = document.querySelectorAll('.grocery-item');
		if(items.length > 0){
		items.forEach(function(item) {
				list.removeChild(item);
		});
		}
		setDefaultValue();
		removeAllLS();
		container.classList.remove('show-container');
		alertDisplay("danger","Empty List");
});





function getLS(){
	return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
function addLS(id, value){
	const items = getLS();
	items.push({id,value});
	// console.log(localStorage.getItem("list"));
	localStorage.setItem("list", JSON.stringify(items));
	// console.log(localStorage.getItem("list"));
}
function removeLS(id){
	let items = getLS();
	items = items.filter(function(item){
		if(item.id != id){
			
			return item;
		}
	});
	// console.log(items);
	localStorage.setItem("list", JSON.stringify(items));
	
}
function removeAllLS(){
	localStorage.clear();
}
function editLS(id, value){
	let items = getLS();
	items = items.map((item) => {
		if(item.id == id){
			item.value = value;
		}
		return item;
	})
	// console.log(items);
	localStorage.setItem("list", JSON.stringify(items));
}
function setUpLS(){
	
	const items = getLS()
	if(!items){
		// console.log("hi");//do not thing if there is nothing in localstorage
	}else{
		container.classList.add('show-container');
		items.forEach( (item) => {
			createWholeList(item.id, item.value);
		});
	}
}
function createWholeList(id, values){
	const attr = document.createAttribute("data-id");
	attr.value = id;
	const item = document.createElement("article");
	item.setAttributeNode(attr);
	item.classList.add('grocery-item');
	item.innerHTML = `<p class="title">${values}</p>
      <div class="btn-container">
        <!-- edit btn -->
        <button class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;

    let editbtn = item.querySelector('.edit-btn');
    let deletebtn = item.querySelector('.delete-btn');
   	deletebtn.addEventListener('click',deleteF);
   	editbtn.addEventListener('click',editF);
   	list.appendChild(item);
   	// console.log(list);
}



