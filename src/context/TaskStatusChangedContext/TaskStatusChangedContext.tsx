import React, {
  FC,
  ReactElement,
  createContext,
  PropsWithChildren,
  useState,
} from 'react';

export const TaskStatusChangedContext = createContext({
  updated: false,
  toggle: () => {
    /* do nothing */
  },
});

export const TaskStatusChangedContextProvider: FC<
  PropsWithChildren
> = (props): ReactElement => {
  const [updated, setUpdated] = useState(false);

  function toggleHandler() {
    updated ? setUpdated(false) : setUpdated(true);
  }

  return (
    <TaskStatusChangedContext.Provider
      value={{ updated, toggle: toggleHandler }}
    >
      {props.children}
    </TaskStatusChangedContext.Provider>
  );
};
