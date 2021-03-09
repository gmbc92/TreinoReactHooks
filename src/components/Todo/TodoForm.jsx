import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

function TodoForm({ todos, setTodos }) {
  const [text, setText] = useState('');

  const onAddTodo = async (event) => {
    event.preventDefault();
    // evento passado no formulario para prevenir o autorefresh da pagina toda no
    const data = {
      completed: false,
      title: text,
    };

    try {
      const response = await axios.post('/todo', data);
      toast.info(`Todo [${text}], created !`);
      setTodos([...todos, response.data]);
      // o response retorna a resposta da requisicao que contem os dados completos incluisve o id
      setText('');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Form onSubmit={onAddTodo}>
      {/* o action aqui seria usado mais com o backend, aqui somente requisitoes http sao o suficiente no front */}
      <Row>
        <Col xl={12} md={9}>
          <Form.Group>
            <Form.Control
              value={text}
              onChange={(event) => setText(event.target.value)}
              type='text'
              placeholder='Insira sua Atividade'
            />
          </Form.Group>
        </Col>
        <Col>
          <Button disabled={!text.trim()} type='submit'>
            Adicionar Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default TodoForm;

// if (!text.trim()) {
//   alert('campo vazio');
//   return;
// }
