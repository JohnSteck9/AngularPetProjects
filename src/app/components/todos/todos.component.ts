import {Component, OnInit} from '@angular/core';
import {Todo, TodosServerService} from "../../services/server/todos-server.service";

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {

  todos: Todo[] = []
  todoTitle: string = ''
  loading = false
  error: string = ''

  constructor(private todosServerService: TodosServerService) {
  }

  ngOnInit() {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) return

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    }

    this.todosServerService.addTodo(newTodo)
      .subscribe(todo => {
        this.todos.push(todo)
        this.todoTitle = ''
      })
  }

  fetchTodos() {
    this.loading = true
    this.todosServerService.fetchTodos()
      .subscribe(todos => {
        this.todos = todos
        this.loading = false
      })
  }

  removeTodo(id: number) {
    this.todosServerService.removeTodo(id)
      .subscribe(response => {
        this.todos = this.todos.filter(t => t.id !== id)
        // console.log(response)
      }, error => {
        console.log('removeTodo Error: ', error)
        this.error = error.message
      }, () => {
      })
  }

  completeTodo(id: number) {
    this.todosServerService.completeTodo(id)
      .subscribe(todo => {
        // console.log(todo)
        this.todos.find(t => t.id === todo.id).completed = true
      })
  }

}
