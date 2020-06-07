import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { ApiConstants } from 'src/app/constants/api-constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public task;
  error: string;
  faCalendar = faCalendar
  model: NgbDateStruct;
  dateSelected = false;
  rating: string;
  constructor(public activeModal: NgbActiveModal,
    private dataService: DataService,
    private storageService: StorageService) { }
  date: { day: number, year: number, month: number };
  ngOnInit() {
    console.log(this.task.dueDate);
    let newDate = new Date(this.task.dueDate);
    console.log(newDate);
    console.log(newDate.getFullYear());
    console.log(newDate.getMonth());
    this.model = { year: newDate.getFullYear(), month: newDate.getMonth() + 1, day: newDate.getDay() };
    const date: NgbDateStruct = { year: 1789, month: 7, day: 14 };

  }

  passBack() {
    let myDate = new Date(this.model.year, this.model.month - 1, this.model.day);
    this.task.dueDate = myDate;
    let tasks;
    if (this.task.taskId != "") {
      tasks = {
        taskId: this.task.taskId,
        taskName: this.task.taskName,
        taskDescription: this.task.taskDescription,
        dueDate: this.task.dueDate,
        status: this.task.status,
        label: this.task.label,
        priority: this.task.priority
      };
    }
    else {
      tasks = {
        taskName: this.task.taskName,
        taskDescription: this.task.taskDescription,
        dueDate: this.task.dueDate,
        status: this.task.status,
        label: this.task.label,
        priority: this.task.priority
      };

    }

    console.log(tasks);

    this.dataService.parseApiCall(ApiConstants.URL.TASKS, 'post', tasks, this.storageService.getTokenHeader())
      .subscribe(res => {
        if (res['hasError'] != true && res['model'] != null) {
          console.log(res);
          this.activeModal.close(this.task);
        }
      }, (err: HttpErrorResponse) => {
        //   this.buttonClickStatus = true;
        console.log(err.status);
        if (err.status === 401) {

        } else {

        }
      });
  }

  public ChangeDate() {
  }

}
