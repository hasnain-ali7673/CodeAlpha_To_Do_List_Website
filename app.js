document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  const heading = document.createElement("h3");
  heading.textContent = task.heading;

  const description = document.createElement("p");
  description.textContent = task.description;

  const date = document.createElement("p");
  date.textContent = `Created: ${formatDate(task.created)} | Due: ${formatDate(
    task.due
  )}`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  editButton.onclick = function () {
    editTask(task.id);
  };

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove-button");
  removeButton.onclick = function () {
    removeTask(task.id);
  };

  const completeButton = document.createElement("button");
  completeButton.textContent = task.completed ? "Incomplete" : "Complete";
  completeButton.classList.add("complete-button");
  completeButton.onclick = function () {
    toggleTaskCompletion(task.id);
  };

  li.appendChild(heading);
  li.appendChild(description);
  li.appendChild(date);
  li.appendChild(editButton);
  li.appendChild(removeButton);
  li.appendChild(completeButton);

  if (task.completed) {
    li.classList.add("completed");
  }

  return li;
}

function addTask() {
  const headingInput = document.getElementById("headingInput");
  const descriptionInput = document.getElementById("descriptionInput");
  const dueDateInput = document.getElementById("dueDateInput");

  const headingText = headingInput.value.trim();
  const descriptionText = descriptionInput.value.trim();
  const dueDate = dueDateInput.value.trim();

  if (headingText !== "" && descriptionText !== "" && dueDate !== "") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      id: Date.now(),
      heading: headingText,
      description: descriptionText,
      created: new Date().toISOString(),
      due: new Date(dueDate).toISOString(),
      completed: false,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const taskList = document.getElementById("taskList");
    const li = createTaskElement(newTask);
    taskList.appendChild(li);

    headingInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
  }
}

function editTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    const newHeading = prompt("Enter new heading:");
    const newDescription = prompt("Enter new description:");
    const newDueDate = prompt("Enter new due date (YYYY-MM-DD):");

    if (newHeading !== null && newDescription !== null && newDueDate !== null) {
      tasks[taskIndex].heading = newHeading;
      tasks[taskIndex].description = newDescription;
      tasks[taskIndex].due = new Date(newDueDate).toISOString();

      localStorage.setItem("tasks", JSON.stringify(tasks));
      loadTasks();
    }
  }
}

function removeTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  loadTasks();
}

function toggleTaskCompletion(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}
