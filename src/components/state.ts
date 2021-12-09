import {atom, selector} from 'recoil';
import {Todos} from 'type';

export const todoListState = atom<Todos[]>({
  key: 'todoListState',
  default: [],
});

export const todoListFilterState = atom({
  key: 'filteredTodoListState',
  default: 'Show Completed',
});

export const uncompletedState = atom({
  key: 'uncompletedState',
  default: 'Show Uncompleted',
});

export const filterTodoListState = selector({
  key: 'filterTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);

      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);

      default:
        return list;
    }
  },
});

export const uncompletedTodoListState = selector({
  key: 'uncompletState',
  get: ({get}) => {
    const filter = get(uncompletedState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);

      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);

      default:
        return list;
    }
  },
});
