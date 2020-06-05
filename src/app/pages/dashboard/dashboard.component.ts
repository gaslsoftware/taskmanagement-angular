import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { DataService } from 'src/app/services/data.service';
import { TaskDetails } from 'src/app/models/task-details';
import { ApiConstants } from 'src/app/constants/api-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  tasksArray: TaskDetails[] = [];

  public getAllTasks() {
    console.log('res');
    this.dataService.parseApiCall(
      ApiConstants.URL.FETCH_TASKS,
      'post',
      '{}',
      this.storageService.getTokenHeader()
    ).subscribe(res => {
      console.log(res);
      this.tasksArray = [];
      res.model.forEach(element => {
        const tasks = new TaskDetails(
          element['taskId'],
          element['taskName'],
          element['taskDescription'],
          element['createdTime'],
          element['updatedTime'],
          element['dueDate'],
          element['status'],
          element['label'],
          element['completedDate'],
          element['userId'],
          element['priority'],
        );
        this.tasksArray.push(tasks);
      });
      console.log(this.tasksArray);
    });

  }

}
