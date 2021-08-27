import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { TodosComponent } from './components/todos/todos.component';
import { UserComponent } from './components/users-table/user/user.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'users', component: UsersTableComponent},
  {path: 'users/:id', component: UserComponent},
  {path: 'todos', component: TodosComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
