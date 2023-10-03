import React, {
  FC,
  ReactElement,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import {
  ICreateTask,
  ICreateTaskInit,
  ICreateTaskResponse,
} from '../taskArea/interfaces/ICreateTask';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/status';
import { Priority } from './enums/priority';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { TaskStatusChangedContext } from '../../context';

const initialState: ICreateTaskInit = {
  title: '',
  description: '',
  date: new Date(),
  status: Status.todo,
  priority: Priority.normal,
};

export const CreateTaskForm: FC = (): ReactElement => {
  // declaring component states
  const [formValues, setFormValues] =
    useState<ICreateTaskInit>(initialState);

  const [showSuccess, setShowSuccess] =
    useState<boolean>(false);

  const taskUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  const changeHandler = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value as string,
    }));
  };

  const clearState = () => {
    setFormValues(initialState);
  };

  // create task mutation
  const taskMutation = useMutation((data: ICreateTask) =>
    sendApiRequest<ICreateTaskResponse>(
      'http://localhost:3200/tasks',
      'POST',
      data,
    ),
  );

  function createTaskHandler() {
    if (
      !formValues.title ||
      !formValues.date ||
      !formValues.description
    ) {
      return;
    }

    const task: ICreateTask = {
      title: formValues.title,
      description: formValues.description,
      date: formValues.date.toString(),
      status: formValues.status,
      priority: formValues.priority,
    };

    taskMutation.mutate(task);
  }

  /*
   * Manage Side Effects inside the application
   */
  useEffect(() => {
    if (taskMutation.isSuccess) {
      setShowSuccess(true);
      taskUpdatedContext.toggle();
      clearState();
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [taskMutation.isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert
          severity="success"
          sx={{ width: '100%', marginBottom: '16px' }}
        >
          <AlertTitle>Success</AlertTitle>
          The task has been created sucessfully
        </Alert>
      )}
      <Typography mb={2} component="h2" variant="h6">
        Create a task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        {/* Task Title */}
        <TaskTitleField
          disabled={taskMutation.isLoading}
          value={formValues.title}
          // onChange={(e) => changeHandler(e)}
          onChange={(e) =>
            setFormValues((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
        {/* Task Description */}
        <TaskDescriptionField
          disabled={taskMutation.isLoading}
          value={formValues.description}
          // onChange={(e) => changeHandler(e)}
          onChange={(e) =>
            setFormValues((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
        {/* Task Date */}
        <TaskDateField
          disabled={taskMutation.isLoading}
          value={formValues.date}
          // onChange={(date) => setDate(date)}
          onChange={(date) => {
            const myDate = date ? date : new Date();
            setFormValues((prevState) => ({
              ...prevState,
              date: myDate,
            }));
          }}
        />
        <Stack
          sx={{ width: '100%' }}
          direction="row"
          spacing={2}
        >
          {/* Task Status */}
          <TaskSelectField
            label="Status"
            name="status"
            disabled={taskMutation.isLoading}
            value={formValues.status}
            // onChange={(e) => selectChange(e)}
            onChange={(e) =>
              setFormValues((prevState) => ({
                ...prevState,
                status: e.target.value as string,
              }))
            }
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
              {
                value: Status.completed,
                label: Status.completed.toUpperCase(),
              },
            ]}
          />
          {/* Task Priority */}
          <TaskSelectField
            label="Priority"
            name="priority"
            disabled={taskMutation.isLoading}
            value={formValues.priority}
            // onChange={(e) => changeHandler(e)}
            onChange={(e) =>
              setFormValues((prevState) => ({
                ...prevState,
                priority: e.target.value as string,
              }))
            }
            items={[
              {
                value: Priority.low,
                label: Priority.low,
              },
              {
                value: Priority.normal,
                label: Priority.normal,
              },
              {
                value: Priority.high,
                label: Priority.high,
              },
            ]}
          />
        </Stack>

        {taskMutation.isLoading && <LinearProgress />}

        <Button
          disabled={
            !formValues.title ||
            !formValues.date ||
            !formValues.description ||
            !formValues.status ||
            !formValues.priority
          }
          onClick={createTaskHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Create a task
        </Button>
      </Stack>
    </Box>
  );
};
