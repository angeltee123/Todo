document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerText = taskText;

    // Toggle task completion
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        li.remove();
    });

    li.appendChild(deleteBtn);
    document.getElementById('todoList').appendChild(li);

    taskInput.value = '';
}
