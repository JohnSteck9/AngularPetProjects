import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatSliderModule} from '@angular/material/slider';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {UsersTableComponent} from './components/users-table/users-table.component';
import {HttpClientModule} from "@angular/common/http/";
import {TodosComponent} from './components/todos/todos.component';
import {FormsModule} from "@angular/forms";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {UserComponent} from './components/users-table/user/user.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    TodosComponent,
    UserComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
