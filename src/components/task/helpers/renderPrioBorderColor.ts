import { Priority } from '../../create-task/enums/priority';

export const renderPrioBorderColor = (
  priority: string,
): string => {
  switch (priority) {
    case Priority.normal:
      return 'rgba(255, 183, 77, 0.7)';
    case Priority.low:
      return 'grey.900';
    case Priority.high:
      return 'error.light';
    default:
      return 'grey.900';
  }
};
