document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");
  const mockTasks = []; 

  function renderTasks(tasks) {
      todoList.innerHTML = "";
      tasks.forEach(function (task) {
          const taskItem = document.createElement("div");
          taskItem.classList.add("task");
          if (task.completed) {
              taskItem.classList.add("completed");
          }
          taskItem.innerHTML = `
              <span>${task.description}</span>
              <button class="remove-btn">Remove</button>
              <button class="toggle-btn">${task.completed ? "Activate" : "Complete"}</button>
          `;
          todoList.appendChild(taskItem);

          const removeBtn = taskItem.querySelector(".remove-btn");
          const toggleBtn = taskItem.querySelector(".toggle-btn");

          removeBtn.addEventListener("click", function () {
              removeTask(task.id);
          });

          toggleBtn.addEventListener("click", function () {
              toggleTaskStatus(task.id, !task.completed);
          });
      });
  }

  function addTask(description) {
      const newTask = { id: Date.now(), description, completed: false };
      mockTasks.push(newTask); 
      renderTasks(mockTasks); 
  }

  function removeTask(id) {
    
      const index = mockTasks.findIndex(task => task.id === id);
      if (index !== -1) {
          mockTasks.splice(index, 1);
      }
      renderTasks(mockTasks); 
  }

  function toggleTaskStatus(id, completed) {
    
      const task = mockTasks.find(task => task.id === id);
      if (task) {
          task.completed = completed;
      }
      renderTasks(mockTasks); 
  }

  addTaskBtn.addEventListener("click", function () {
      const newTaskDescription = taskInput.value;
      if (newTaskDescription.trim() !== "") {
          addTask(newTaskDescription);
          taskInput.value = "";
      }
  });


  renderTasks(mockTasks);
});
