import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from '../../utils/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Card from '../../componentes/Card';

function Todo() {
  const { id } = useParams();
  //   o use params eh o valor id passado pela rota no routes
  const [todo, setTodo] = useState({});

  const fetchTodo = async () => {
    try {
      const response = await axios.get(`/todo/${id}`);
      setTodo(response.data);
    } catch (e) {
      toast.error(e.message);
    }
  };
  //   quando a pagina abrir faz a requisicao
  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <Container className='mt-5'>
      <Card title='Todo'>
        <h2>{`Title: ${todo.title}`}</h2>
      </Card>
    </Container>
  );
}

export default Todo;
