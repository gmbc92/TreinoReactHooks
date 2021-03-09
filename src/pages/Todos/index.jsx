import React from 'react';
import { Container } from 'react-bootstrap';

import Todo from '../../components/Todo';
import Card from '../../components/Card';

function index() {
  return (
    <Container>
      <Card title='Todo App' className='m-4'>
        <h3>Lista de Atividades</h3>

        <Todo />
      </Card>
    </Container>
  );
}

export default index;
