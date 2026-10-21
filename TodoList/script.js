document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const emptyState = document.getElementById('emptyState');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];
    let currentFilter = 'all';

    // Add Task Event
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        // Validate user input (Task 6)
        if (taskText === '') {
            alert('Task cannot be empty or contain only spaces.');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }

    // Render Tasks based on filter
    function renderTasks() {
        taskList.innerHTML = '';

        let filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center py-3';

            const div = document.createElement('div');
            div.className = 'form-check';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input';
            checkbox.checked = task.completed;
            checkbox.id = `task-${task.id}`;
            checkbox.addEventListener('change', () => toggleTask(task.id));

            const label = document.createElement('label');
            label.className = `form-check-label ${task.completed ? 'completed-task' : ''}`;
            label.setAttribute('for', `task-${task.id}`);
            label.textContent = task.text;

            div.appendChild(checkbox);
            div.appendChild(label);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            li.appendChild(div);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });

        updateCounter();
    }

    // Toggle Task Completion (Task 4)
    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        renderTasks();
    }

    // Delete Task (Task 5)
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    // Update Remaining Task Counter (Task 8)
    function updateCounter() {
        const activeCount = tasks.filter(task => !task.completed).length;
        taskCounter.textContent = `${activeCount} remaining`;
    }

    // Filter Buttons (Task 7)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            renderTasks();
        });
    });

    // Clear Completed Tasks (Task 8)
    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        renderTasks();
    });
});