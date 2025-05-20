// DOM Elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize app
function init() {
    renderTasks();
    addEventListeners();
}

// Add event listeners
function addEventListeners() {
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the DOM
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        
        taskItem.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" data-id="${task.id}">✓</button>
                <button class="delete-btn" data-id="${task.id}">✕</button>
            </div>
        `;
        
        taskList.appendChild(taskItem);
    });
    
    // Add event listeners to task action buttons
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', toggleTaskStatus);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteTask);
    });
}

// Toggle task completion status
function toggleTaskStatus(e) {
    const taskId = parseInt(e.target.getAttribute('data-id'));
    
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(e) {
    const taskId = parseInt(e.target.getAttribute('data-id'));
    tasks = tasks.filter(task => task.id !== taskId);
    
    saveTasks();
    renderTasks();
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);