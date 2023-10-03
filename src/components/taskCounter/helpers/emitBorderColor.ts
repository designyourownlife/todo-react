import { Status } from '../../create-task/enums/status';
import { TaskCounterStatusType } from '../interfaces/ITaskCounter';

export const emitBorderColor = (
  status: TaskCounterStatusType,
): string => {
  switch (status) {
    case Status.todo:
      return 'error.light';
    case Status.inProgress:
      return 'warning.light';
    case Status.completed:
      return 'success.light';
    default:
      return '#ffffff';
  }
};
