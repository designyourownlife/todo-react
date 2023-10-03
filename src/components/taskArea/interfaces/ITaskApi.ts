import { Priority } from '../../create-task/enums/priority';
import { Status } from '../../create-task/enums/status';

export interface ITaskApi {
  id: string;
  date: string;
  title: string;
  description: string;
  priority: `${Priority}`;
  status: `${Status}`;
}
