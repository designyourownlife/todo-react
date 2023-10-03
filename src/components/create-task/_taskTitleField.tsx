import React, { FC, ReactElement } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { ITextField } from './interfaces/ITextField';

export const TaskTitleField: FC<ITextField> = (
  props,
): ReactElement => {
  // destructure props
  const {
    value = '',
    onChange = (e) => console.log(e),
    disabled = false,
  } = props;
  return (
    <TextField
      id="title"
      name="title"
      value={value}
      label="Task title"
      placeholder="Task title"
      variant="outlined"
      size="small"
      fullWidth
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TaskTitleField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
