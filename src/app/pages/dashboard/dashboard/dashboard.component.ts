import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaskDetails } from 'src/app/models/task-details';
import { ApiConstants } from 'src/app/constants/api-constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { Subject } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private router: Router, ) { }

  ngOnInit(): void {
  }

  tasksArray: TaskDetails[] = [];
  task: TaskDetails;

  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  resetChildForm() {
    this.resetFormSubject.next(true);
  }

  selectedTask($event) {
    this.task = new TaskDetails($event.taskId, $event.taskName, $event.taskDescription, $event.createdTime, $event.updatedTime, $event.dueDate, $event.status, $event.label, $event.completedDate, $event.userId, $event.priority, 1);
    console.log($event);
    console.log('parent');
  }
  public addTask() {
    this.task = new TaskDetails('', '', '', '', '', '', '', '', '', '', '', 0);
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg', windowClass: 'modal-xl' });
    modalRef.componentInstance.task = this.task;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.resetChildForm();
      }
    });
  }

  public editTask() {
    const modalRef = this.modalService.open(ModalComponent, { size: 'lg', windowClass: 'modal-xl' });
    modalRef.componentInstance.task = this.task;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.resetChildForm();
      }
    });
  }
}