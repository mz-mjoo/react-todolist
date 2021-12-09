import React, {FC} from 'react';

interface TodoTemplateProps {
  title: string;
}

const TodoTemplate: FC<TodoTemplateProps> = ({title, children}) => {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default TodoTemplate;
