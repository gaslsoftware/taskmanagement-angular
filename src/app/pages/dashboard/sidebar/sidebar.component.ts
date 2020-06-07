import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaskDetails } from 'src/app/models/task-details';
import { ApiConstants } from 'src/app/constants/api-constants';
import { Subject } from "rxjs";
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  active = 1;

  constructor(private dataService: DataService,
    private storageService: StorageService) { }

  @Output() onSelectTask = new EventEmitter();

  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.getAllTasks();
    this.resetFormSubject.subscribe(response => {
      console.log(response);
      if (response) {
        this.getAllTasks(this.activeTab);
        // Or do whatever operations you need.
      }
    });
  }

  tasksArray: TaskDetails[] = [];
  selectedId: number = 0;
  activeTab: number = 1;
  public getAllTasks(id: number = 1) {
    console.log('res');
    let filters;
    if (id == 1) {
      filters = {
      };
    }
    if (id == 2) {
      filters = {
        status: "New",
      };
    }
    if (id == 3) {
      filters = {
        status: "In Progress",
      };
    }
    if (id == 4) {
      filters = {
        status: "Completed",
      };
    }
    this.dataService.parseApiCall(
      ApiConstants.URL.FETCH_TASKS,
      'post',
      filters,
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
          0
        );
        this.tasksArray.push(tasks);
      });
      if (this.selectedId != undefined) {
        this.tasksArray[this.selectedId].isSelected = 1;
        this.handleClick(1, this.tasksArray[this.selectedId], this.selectedId);
      }
      else {
        this.selectedId = 0;
        this.tasksArray[this.selectedId].isSelected = 1;
        this.handleClick(1, this.tasksArray[this.selectedId], this.selectedId);
      }
      console.log(this.tasksArray);
    });
  }
  handleClick(event: any, task, index) {
    if (this.selectedId != undefined) {
    this.tasksArray[this.selectedId].isSelected = 0;
    this.selectedId = index;
    task.isSelected = 1;
    this.onSelectTask.emit(task);
    }
    else
    {
      this.selectedId = 0;
      this.tasksArray[this.selectedId].isSelected = 0;
      this.selectedId = index;
      task.isSelected = 1;
      this.onSelectTask.emit(task);
    }
    // console.log(task)
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    console.log(changeEvent);
    this.activeTab = changeEvent.nextId;
    if (changeEvent.nextId == 1) {
      this.selectedId = 0;
      this.getAllTasks(1);
    }
    else if (changeEvent.nextId == 2) {
      this.selectedId = 0;
      this.getAllTasks(2);
    }
    else if (changeEvent.nextId == 3) {
      this.selectedId = 0;
      this.getAllTasks(3);
    }
    else if (changeEvent.nextId == 4) {
      this.selectedId = 0;
      this.getAllTasks(4);
    }
  }

  public searchTask()
  {
    
  }

}
