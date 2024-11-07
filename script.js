document.addEventListener('DOMContentLoaded', loadTasks); // Load tasks on page load
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    addTaskToDOM(taskText, false); // Add new task to DOM as incomplete
    saveTask(taskText, false); // Save task to localStorage

    taskInput.value = '';
}

function addTaskToDOM(taskText, isCompleted) {
    const li = document.createElement('li');
    li.innerText = taskText;
    li.classList.toggle('completed', isCompleted);

    // Toggle task completion
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        updateTaskStatus(taskText, li.classList.contains('completed'));
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        li.remove();
        deleteTask(taskText);
    });

    li.appendChild(deleteBtn);
    document.getElementById('todoList').appendChild(li);
}

function saveTask(taskText, isCompleted) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatus(taskText, isCompleted) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = isCompleted;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
