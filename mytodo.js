let taskList = [];

document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
        taskList = JSON.parse(storedTasks);
        updateTaskList();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskListContainer = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const task = taskInput.value;
        taskList.push(task);
        
        console.log(`Task added: ${task}`);

        localStorage.setItem('taskList', JSON.stringify(taskList));

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task}</span>
            <button class="edit-button" onclick="editTask(${taskList.length - 1})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${taskList.length - 1})">Delete</button>
        `;
        taskListContainer.appendChild(listItem);

        taskInput.value = '';
    }
}

function editTask(index) {
    const newTask = prompt('Edit task:', taskList[index]);
    if (newTask !== null) {
        taskList[index] = newTask;
        updateTaskList();
    }
}

function deleteTask(index) {
    taskList.splice(index, 1);
    updateTaskList();
}

function updateTaskList() {
    const taskListContainer = document.getElementById('taskList');
    taskListContainer.innerHTML = '';

    taskList.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task}</span>
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
        `;
        taskListContainer.appendChild(listItem);
        
    });
}
updateTaskList();