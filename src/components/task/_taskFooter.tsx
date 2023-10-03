import React, { FC, ReactElement } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import PropTypes from 'prop-types';

import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../create-task/enums/status';

export const TaskFooter: FC<ITaskFooter> = (
  props,
): ReactElement => {
  // Destructure props
  const {
    id,
    status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            color="warning"
            defaultChecked={status === Status.inProgress}
            onChange={(e) => onStatusChange(e, id)}
          />
        }
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: 'rgba(255,255,255,0.9)' }}
        onClick={(e) => onClick(e, id)}
      >
        Mark complete
      </Button>
    </Box>
  );
};

TaskFooter.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
};
