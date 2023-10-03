import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
} from 'react';
import {
  Grid,
  Box,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import format from 'date-fns/format';

import { Status } from '../create-task/enums/status';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/Task';
import { ITaskApi } from './interfaces/ITaskApi';
import { IUpdateTask } from '../create-task/interfaces/IUpdateTask';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
  const taskUpdatedCtx = useContext(
    TaskStatusChangedContext,
  );

  const {
    error,
    isLoading,
    data = [],
    refetch,
  } = useQuery(
    ['tasks'],
    async () =>
      await sendApiRequest<ITaskApi[]>(
        'http://localhost:3200/tasks',
        'GET',
      ),
  );

  // update task mutation
  const updateTaskMutation = useMutation(
    async (data: IUpdateTask) =>
      await sendApiRequest(
        'http://localhost:3200/tasks',
        'PUT',
        data,
      ),
  );

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked
        ? Status.inProgress
        : Status.todo,
    });
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  }

  // handle side-effects
  useEffect(() => {
    refetch();
  }, [taskUpdatedCtx.updated]);

  useEffect(() => {
    if (updateTaskMutation.isSuccess) {
      taskUpdatedCtx.toggle();
    }
  }, [updateTaskMutation.isSuccess]);

  return (
    <Grid item md={8} px={4}>
      <Box mb={8} px={4}>
        <h2>
          Status of your tasks as on{' '}
          {format(new Date(), 'PPPP')}
        </h2>
      </Box>
      <Grid
        container
        display="flex"
        justifyContent="center"
      >
        <Grid
          item
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          md={10}
          xs={12}
          mb={8}
        >
          <Box>
            <TaskCounter
              status={Status.todo}
              count={
                data
                  ? countTasks(data, Status.todo)
                  : undefined
              }
            />
          </Box>
          <Box>
            <TaskCounter
              status={Status.inProgress}
              count={
                data
                  ? countTasks(data, Status.inProgress)
                  : undefined
              }
            />
          </Box>
          <Box>
            <TaskCounter
              status={Status.completed}
              count={
                data
                  ? countTasks(data, Status.completed)
                  : undefined
              }
            />
          </Box>
        </Grid>
        <Grid
          item
          display="flex"
          flexDirection="column"
          xs={10}
          md={8}
        >
          {error ? (
            <Alert severity="error">
              Error fetching the tasks
            </Alert>
          ) : (
            data instanceof Array &&
            !isLoading &&
            data.length === 0 && (
              <Alert severity="warning">
                You haven’t created any tasks yet.
              </Alert>
            )
          )}

          {isLoading ? (
            <LinearProgress />
          ) : (
            data instanceof Array &&
            data.length > 0 &&
            data
              .sort(
                (a: ITaskApi, b: ITaskApi) =>
                  new Date(b.date).getTime() -
                  new Date(a.date).getTime(),
              )
              .map((task) => {
                const {
                  id,
                  title,
                  date,
                  description,
                  priority,
                  status,
                } = task;
                return (
                  (task.status === Status.todo ||
                    task.status === Status.inProgress) && (
                    <Task
                      key={id}
                      id={id}
                      title={title}
                      date={new Date(date)}
                      description={description}
                      priority={priority}
                      status={status}
                      onStatusChange={onStatusChangeHandler}
                      onClick={markCompleteHandler}
                    />
                  )
                );
              })
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
