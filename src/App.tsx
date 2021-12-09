import React, {ChangeEvent, useMemo, useState, useEffect} from 'react';
import AddTodo from './components/AddTodo';
import {RecoilRoot} from 'recoil';
import Todo from './components/TodoList';
import './style/globals.css';
import styled from '@emotion/styled';
import produce from 'immer';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import {nanoid} from 'nanoid';

export type Props = {
  id: string;
  title: string;
};

const AppContainer = styled.div`
  width: 80%;
  margin: 100px auto 0;
`;

const TodoWrapper = styled.ul`
  border: 1px solid #000;
  li {
    width: 100px;
    height: 50px;
    background-color: aliceblue;
    margin: 10px;
  }
`;

function App() {
  // const todos = useMemo<Props[]>(() => {
  //   return [
  //     {id: '1', title: '공부'},
  //     {id: '2', title: '헬스'},
  //     {id: '3', title: '독서'},
  //     {id: '4', title: '산책'},
  //     {id: '5', title: '요리'},
  //   ];
  // }, []);

  const getItems = (count: number) =>
    Array.from({length: count}, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      title: `item ${k}`,
    }));

  const [todoList, setTodoList] = useState<Props[]>(getItems(10));

  const reorder = (list: Props[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log('result', result);

    return result;
  };

  const handleChange = ({destination, source}: DropResult) => {
    console.log('dest:', destination, 'src:', source, 'ㅇㅅㅇ..;명주짱');

    if (!destination) {
      return;
    }

    const items = reorder(todoList, source.index, destination.index);

    setTodoList(
      produce(todoList, (draft) => {
        draft.push({id: String(source.index), title: ''});
      }),
    );
    // setTodoList(items);
    // setTodoList(produce((draft) => draft.push(items)));

    // setTodoList(
    //   produce(todoList, (draft) => {
    //     draft.push();
    //   }),
    // );
    console.log('todolist', items);
    console.log(todoList);
  };
  return (
    <RecoilRoot>
      <AppContainer>
        <AddTodo />
        <Todo />
        <DragDropContext onDragEnd={handleChange}>
          <Droppable droppableId="todos">
            {(provided) => (
              <TodoWrapper {...provided.droppableProps} ref={provided.innerRef}>
                {todoList.map(({id, title}, index) => (
                  <Draggable key={index} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {title}
                      </li>
                    )}
                  </Draggable>
                ))}
              </TodoWrapper>
            )}
          </Droppable>
        </DragDropContext>
      </AppContainer>
    </RecoilRoot>
  );
}

export default App;
