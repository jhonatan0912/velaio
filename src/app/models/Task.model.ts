export class Task {
  id!: string;
  title!: string;
  deadline!: Date;
  associates!: TaskAssigned[];
  done!: boolean;
}

export class TaskAssigned {
  fullName!: string;
  age!: number;
  skills!: string[];
}