import React, { FC, ReactElement } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Avatar, Box, Typography } from '@mui/material';

interface IProfile {
  name: string;
}

export const Profile: FC<IProfile> = (
  props,
): ReactElement => {
  // destructure props
  const { name = 'John' } = props;

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
            backgroundColor: 'primary.main',
          }}
        >
          <Typography variant="h4" color="text.primary">
            {`${name.substring(0, 1)}`}
          </Typography>
        </Avatar>
        <Typography variant="h6" color="text.primary">
          {`Welcome, ${name}`}
        </Typography>
        <Typography variant="body1" color="text.primary">
          This is your personal task manager
        </Typography>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .avatar {
    width: 96px;
    height: 96px;
    margin-bottom: 16px;
  }
`;

Profile.propTypes = {
  name: PropTypes.string.isRequired,
};
