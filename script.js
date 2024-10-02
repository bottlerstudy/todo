const list = document.getElementById("list");
const createBtn = document.getElementById("create-btn");

let todos = [{id: 1, text: "밥먹기", complete: false}];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
    
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false,
    }

    todos.unshift(item);

    const { itemEl, inputEl, editBtmEl, removeBtnEl } = createTodoElement(item);
    list.prepend(itemEl);

    inputEl.removeAttribute("disabled");
    inputEl.focus();
    saveToLocalStorage();
}

function createTodoElement(item) {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.checked = item.complete;

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

		if (item.complete) {
			itemEl.classList.add("complete");
		} else {
			itemEl.classList.remove("complete");
		}

		saveToLocalStorage();
    })
    
    if (item.complete) {
        itemEl.classList.add("complete");
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = item.text;
    inputEl.setAttribute("disabled", "");

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled','');
        saveToLocalStorage();
    })

    const actionEl = document.createElement("div");
    actionEl.classList.add("actions");

    const editBtmEl = document.createElement("button");
    editBtmEl.classList.add("material-icons", "edit");
    editBtmEl.innerText = "edit";

    editBtmEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

	const removeBtnEl = document.createElement("button");
	removeBtnEl.classList.add("material-icons", "remove-btn");
	removeBtnEl.innerText = "remove_circle";

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })

    actionEl.appendChild(editBtmEl);
    actionEl.appendChild(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionEl);

    return { itemEl, inputEl, editBtmEl, removeBtnEl };
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);

    window.localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if (data) {
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadFromLocalStorage();
    
    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];
        const { itemEl } = createTodoElement(element);

        list.append(itemEl);
    }
}

displayTodos();