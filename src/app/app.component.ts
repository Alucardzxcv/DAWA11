import { Component, ViewChild } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: string[] = [];
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  addTask(task: string) {
    this.tasks.push(task);
  }

  onFilterChanged(filter: string) {
    const taskStatus = this.taskListComponent.taskStatus;
    let filteredTasks: string[] = [];

    if (filter === 'completed') {
      filteredTasks = Object.keys(taskStatus).filter(task => taskStatus[task]);
    } else if (filter === 'incomplete') {
      filteredTasks = this.tasks.filter(task => !taskStatus.hasOwnProperty(task));
    } else {
      filteredTasks = this.tasks;
    }

    this.taskListComponent.filteredTasks = () => filteredTasks;
    this.taskListComponent.selectedFilter = filter;
  }
}
