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
        this.getAllTasks();
        // Or do whatever operations you need.
      }
    });
  }

  tasksArray: TaskDetails[] = [];
  selectedId: number = 0;
  public getAllTasks(id:number =1) {
    console.log('res');
    if(id==1)
    {
      
    }
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
          0
        );
        this.tasksArray.push(tasks);
      });
      this.tasksArray[this.selectedId].isSelected = 1;
      this.handleClick(1, this.tasksArray[this.selectedId], this.selectedId);
      console.log(this.tasksArray);
    });
  }
  handleClick(event: any, task, index) {
    this.tasksArray[this.selectedId].isSelected = 0;
    this.selectedId = index;
    task.isSelected = 1;
    this.onSelectTask.emit(task);
    // console.log(task)
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    console.log(changeEvent);
    if(changeEvent.nextId == 1)
    {

    }
    else if(changeEvent.nextId == 1)
    {
      
    }
   else if(changeEvent.nextId == 1)
    {
      
    }
  }

}
