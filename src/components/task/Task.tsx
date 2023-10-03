import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import { ITask } from './interfaces/ITask';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { renderPrioBorderColor } from './helpers/renderPrioBorderColor';

import { Priority } from '../create-task/enums/priority';
import { Status } from '../create-task/enums/status';

export const Task: FC<ITask> = (props): ReactElement => {
  const {
    id,
    title = 'Default Title',
    date = new Date(),
    description = 'This is a just another placeholder description text.',
    priority = Priority.normal,
    status = Status.todo,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;
  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="flex-start"
      flexDirection="column"
      mb={4}
      p={2}
      sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: renderPrioBorderColor(priority),
      }}
    >
      {/* Task Header */}
      <TaskHeader title={title} date={date} />
      {/* Task Description */}
      <TaskDescription description={description} />
      {/* Task Footer */}
      <TaskFooter
        id={id}
        status={status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
};

Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  priority: PropTypes.string,
  status: PropTypes.string,
};
