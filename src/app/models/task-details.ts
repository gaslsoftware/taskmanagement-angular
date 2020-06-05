export class TaskDetails {
    constructor(
        public taskId: number| string,
        public taskName: number| string,
        public taskDescription: number| string,
        public createdTime: number| string,
        public updatedTime: number| string,
        public dueDate: number| string,
        public status: number| string,
        public label: number| string,
        public completedDate: number| string,
        public userId: number| string,
        public priority: number| string,
       
    ) {}
}


