import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import axios from '../../utils/api';
import TodoForm from './TodoForm';
import { toast } from 'react-toastify';

export default function Index() {
  // aqui houve um problema quando o nome da functionçao estava minusculo index, ao botar Index funcinou
  const [todos, setTodos] = useState([]);
  const [todoError, setTodoError] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todo');
      setTodos(response.data);
      // requisicao do tipo get, url ja foi passado no utils apiJs
    } catch (e) {
      toast.error(e.message);
      setTodoError(e.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todoError={todoError} todos={todos} setTodos={setTodos} />
    </div>
  );
}
