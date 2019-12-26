var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos.
        // this.todos is an array which is why it has the forEach method.
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
      
        this.todos.forEach(function(todo) {
        // Case 1: If everything's true, make everything false.
        if (completedTodos === totalTodos) {
            todo.completed = false;
        // Case 2: Otherwise make everything true.
        } else {
            todo.completed = true;
        }
      })
    }
};

var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(position) {
        // Position is the id of the li element
        todoList.deleteTodo(position);
        view.displayTodos();
    },
    toggleCompleted(position) {
        todoList.toggleCompleted(position);
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }  
};
  
var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
      
        todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement('li');
        var todoTextWithCompletion = '';
        
        if (todo.completed === true) {
            todoTextWithCompletion = todo.todoText;
            todoLi.classList.toggle('completed');
        } else {
            todoTextWithCompletion = todo.todoText;
        }
        
        // the id is equal to the position in the array
        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.insertBefore(this.createCompletedButton(), todoLi.firstChild);
        todoLi.appendChild(this.createDeleteButton());
        todosUl.appendChild(todoLi);  
      }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    createCompletedButton: function() {
        var completedButton = document.createElement('button');
        completedButton.textContent = '✔';
        completedButton.className = 'completedButton';
        return completedButton;
    },
    setUpEventListeners: function() {
        var todosUl = document.querySelector('ul');
  
        // The higher order function addEventListener will run the function inside.
        todosUl.addEventListener('click', function(event) {
    
        // Get the element that was clicked on.
        var elementClicked = event.target;
    
        // Check if elementClicked is a delete button.
        if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));    
        }
        if (elementClicked.className === 'completedButton') {
            handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
        }
    });
   }
};

view.setUpEventListeners();