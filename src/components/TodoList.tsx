import React, {FC} from 'react';
import {atom, selector, useRecoilValue} from 'recoil';
import TodoItem from './TodoItem';
import {Todos} from 'type';
import {
  filterTodoListState,
  todoListState,
  uncompletedState,
  uncompletedTodoListState,
} from './state';
import styled from '@emotion/styled';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import TodoTemplate from './TodoTemplate';

interface Props {}

const Container = styled.div`
  /* border: 1px solid red; */
  margin-top: 30px;
`;

const Inner = styled.div`
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-around;
  .listWrapper {
    display: flex;
  }
`;

const TodoList = styled.ul`
  /* background-color: aliceblue; */
  /* border: 1px solid black; */
  padding: 20px;
  h3 {
    padding-bottom: 15px;
  }
`;

const List = styled.div`
  border: 1px solid black;
  li {
    border: 1px solid red;
    width: 50px;
    height: 50px;
    margin: 5px;
  }
`;

const Todo: FC = (props: Props) => {
  const todoList = useRecoilValue(todoListState);
  const filterTodoList = useRecoilValue(filterTodoListState);
  const unCompTodoList = useRecoilValue(uncompletedTodoListState);

  const onDragEnd = () => {};
  const todos = [
    {id: '1', title: '공부'},
    {id: '2', title: '헬스'},
    {id: '3', title: '독서'},
    {id: '4', title: '산책'},
    {id: '5', title: '요리'},
  ];

  return (
    <Container>
      <Inner>
        {/* <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todolist">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="listWrapper"
              >
                <List>
                  {todos.map(({id, title}, index) => (
                    <Draggable key={id} draggableId={'todolist'} index={1}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {title}1
                        </li>
                      )}
                    </Draggable>
                  ))}
                </List>
                <List>
                  {todos.map(({id, title}, index) => (
                    <Draggable key={id} draggableId={'todolist2'} index={2}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {title}2
                        </li>
                      )}
                    </Draggable>
                  ))}
                </List>
                <List>
                  {todos.map(({id, title}, index) => (
                    <Draggable key={id} draggableId={'todolist3'} index={3}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {title}3
                        </li>
                      )}
                    </Draggable>
                  ))}
                </List> */}

        {/* TodoList */}
        <TodoTemplate title="To Do List">
          {todoList.map((todo: Todos) => (
            <TodoItem key={todo.id} toDos={todo} />
          ))}
        </TodoTemplate>

        {/* Completed */}
        <TodoTemplate title="Completed">
          {filterTodoList.map((todo: Todos) => (
            <TodoItem key={todo.id} toDos={todo} />
          ))}
        </TodoTemplate>

        {/* UnCOMPLETE */}
        <TodoTemplate title="UnCompleted">
          {unCompTodoList.map((todo: Todos) => (
            <TodoItem key={todo.id} toDos={todo} />
          ))}
        </TodoTemplate>
        {/* </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </Inner>
    </Container>
  );
};

export default Todo;
