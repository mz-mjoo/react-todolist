import styled from '@emotion/styled';
import React, {FC, useState, ChangeEvent} from 'react';
import {useRecoilState} from 'recoil';
import {Todos} from 'type';
import {todoListState} from './state';

interface todoItemProps {
  //   text: string;
  //   id: string;
  //   isComplete: boolean;
  toDos: Todos;
  key: string;
}

const ItemWrapper = styled.li`
  /* padding: 20px; */
  /* border: 1px solid lime; */
  width: 300px;
  height: 200px;
  background-color: #fff;
  border-radius: 30px;
  margin-top: 20px;
  padding: 30px;

  button {
    font-size: 20px;
  }
`;

const TodoItem: FC<todoItemProps> = ({toDos}) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editing, setEdting] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('');

  const removeItemAtIndex = (todoList: Todos[], idx: string) => {
    return todoList.filter((item: Todos) => item.id !== idx);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, toDos.id);

    setTodoList(newList);
  };

  const replaceItemAtIndex = (todoList: Todos[], id: string, newVal: Todos) => {
    return todoList.map((item: Todos) => {
      if (item.id === id) {
        return newVal;
      }

      return item;
    });
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, toDos.id, {
      ...toDos,
      isComplete: !toDos.isComplete,
    });

    setTodoList(newList);
  };

  const handleToggleItem = () => {
    if (!editing) {
      setEditValue(toDos.text);
    } else {
      setTodoList((oldTodo): Todos[] => {
        return oldTodo.map((arr) => {
          if (arr.id === toDos.id) {
            return {
              ...toDos,
              text: editValue,
            };
          }

          return arr;
        });
      });
    }

    setEdting(!editing);
  };

  const editHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  return (
    <ItemWrapper>
      {!editing ? (
        <p>{toDos.text}</p>
      ) : (
        <div>
          <input type="text" value={editValue} onChange={editHandleChange} />
        </div>
      )}
      <button onClick={toggleItemCompletion}>
        {toDos.isComplete ? '🙅🏻‍♀️' : '🙆🏻‍♀️'}
      </button>
      {!toDos.isComplete && (
        <button type="button" onClick={handleToggleItem}>
          ✏️
        </button>
      )}

      <button type="button" onClick={deleteItem}>
        ❌
      </button>
    </ItemWrapper>
  );
};

export default TodoItem;
