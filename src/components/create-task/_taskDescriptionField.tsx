import React, { FC, ReactElement } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { ITextField } from './interfaces/ITextField';

export const TaskDescriptionField: FC<ITextField> = (
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
      id="description"
      name="title"
      value={value}
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      fullWidth
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TaskDescriptionField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
