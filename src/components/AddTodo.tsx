import React, {
  ChangeEventHandler,
  FormEvent,
  FC,
  useState,
  ChangeEvent,
} from 'react';
import styled from '@emotion/styled';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {todoListState} from './state';
import {nanoid} from 'nanoid';
import {Todos} from 'type';

export interface AddTodoProps {}

const Container = styled.div``;
const Form = styled.form`
  padding-top: 20px;
  text-align: center;
`;
const Input = styled.input`
  background: none;
  /* border-bottom: 2px solid #000; */
  width: 30%;
  margin: 0 auto;
`;
const Button = styled.button`
  /* font-size: 0; */
`;

const AddTodo: FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const setTodoList = useSetRecoilState(todoListState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setNewTodo(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTodoList((oldTodo) => {
      return [
        ...oldTodo,
        {
          text: newTodo,
          id: nanoid(),
          isComplete: false,
        },
      ];
    });

    setNewTodo('');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input type="text" onChange={handleChange} value={newTodo} />

        <Button type="submit">submit</Button>
      </Form>
    </Container>
  );
};

export default AddTodo;
