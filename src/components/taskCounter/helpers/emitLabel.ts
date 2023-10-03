import { Status } from '../../create-task/enums/status';
import { TaskCounterStatusType } from '../interfaces/ITaskCounter';

export const emitLabel = (
  status: TaskCounterStatusType,
): string => {
  switch (status) {
    case Status.todo:
      return 'Todos';
    case Status.inProgress:
      return 'In Progress';
    case Status.completed:
      return 'Completed';
    default:
      return '';
  }
};
