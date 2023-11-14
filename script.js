document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTask.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addNewTask(taskText);
            taskInput.value = "";
            saveTasksToLocalStorage();
        }
    });

    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask.click();
        }
    });

    taskList.addEventListener("click", function(event) {
        const target = event.target;

        if (target.classList.contains("delete")) {
            deleteTask(target.parentElement);
            saveTasksToLocalStorage();
        } else if (target.classList.contains("edit")) {
            editTask(target.parentElement);
        } else if (target.classList.contains("complete")) {
            toggleComplete(target.parentElement);
            saveTasksToLocalStorage();
        }
    });

    loadTasksFromLocalStorage();

    function addNewTask(taskText, completed) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete">Delete</button>
            <button class="edit">Edit</button>
            <button class="complete">${completed ? "✓" : "Complete"}</button>
        `;
        if (completed) {
            li.classList.add("completed");
        }
        taskList.appendChild(li);
    }

    function deleteTask(task) {
        taskList.removeChild(task);
    }

    function editTask(task) {
        const newText = prompt("Edit task:", task.firstChild.textContent);
        if (newText !== null) {
            task.firstChild.textContent = newText;
            saveTasksToLocalStorage();
        }
    }

    function toggleComplete(task) {
        task.classList.toggle("completed");
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll("li");
        taskItems.forEach(task => {
            const taskText = task.querySelector("span").textContent;
            const completed = task.classList.contains("completed");
            tasks.push({ text: taskText, completed: completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addNewTask(task.text, task.completed);
        });
    }
});
