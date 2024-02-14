const addForm = document.getElementById("add-form");
const todoList = document.getElementById("todo-list");
const descriptionInput = document.getElementById("description");

let state = {
  todos: [],
};

function render() {
  todoList.innerHTML = "";

  state.todos.forEach((todo, i) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", () => {
      console.log();
      todo.done = !todo.done;
      render();
    });
    const htmlId = `todo-${todo.id}`;
    checkbox.id = htmlId;

    const label = document.createElement("label");
    label.textContent = todo.description;
    label.setAttribute("for", htmlId);

    li.append(checkbox, label);

    todoList.append(li);
  });
}

const URL = "http://localhost:4730/todos";

function refresh() {
  console.log("refresh start");
  // Daten frisch aus der API laden und state zu überschreiben
  fetch(URL)
    .then((res) => res.json())
    .then((todos) => {
      console.log("todos geparsed");
      state.todos = todos;
      render();
    });
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Submit");

  const inputText = descriptionInput.value;
  const description = inputText.trim();
  const id = Date.now().toString();
  console.log("id", id);

  //   state.todos.push({
  //     id,
  //     description,
  //     done: false,
  //   });
  //   render();

  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      description,
      done: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    refresh();
  });

  descriptionInput.value = "";
});

render();
refresh();
