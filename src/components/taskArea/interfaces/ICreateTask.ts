export interface ICreateTask {
  title: string;
  description: string;
  date: string;
  status: string;
  priority: string;
}
export interface ICreateTaskResponse {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  priority: string;
}

export interface ICreateTaskInit {
  title: string;
  description: string;
  date: Date;
  status: string;
  priority: string;
}
