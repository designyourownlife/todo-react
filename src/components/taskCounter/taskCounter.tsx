import React, { FC, ReactElement } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { ITaskCounter } from './interfaces/ITaskCounter';
import { Status } from '../create-task/enums/status';
import { emitBorderColor } from './helpers/emitBorderColor';
import { emitLabel } from './helpers/emitLabel';

export const TaskCounter: FC<ITaskCounter> = (
  props,
): ReactElement => {
  const { count = 0, status = Status.todo } = props;
  return (
    <Wrapper>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          className="avatar"
          sx={{
            borderColor: `${emitBorderColor(status)}`,
          }}
        >
          <Typography color="#fff" variant="h4">
            {count}
          </Typography>
        </Avatar>
        <Typography
          color="#fff"
          fontWeight="bold"
          fontSize="20px"
          variant="h5"
        >
          {emitLabel(status)}
        </Typography>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .avatar {
    width: 96px;
    height: 96px;
    border-width: 5px;
    border-style: solid;
    background-color: transparent;
    margin-bottom: 16px;
  }
`;

TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf([
    Status.todo,
    Status.inProgress,
    Status.completed,
  ]),
};
