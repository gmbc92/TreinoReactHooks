import React from 'react';
import axios from '../../utils/api';
import { Row, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TodoList = ({ todos, setTodos, todoError }) => {
  // os estados foram passados para um componente pai index e reutilizados nos demais
  // const [] = useState('');

  const onCompleteTodo = async ({ target: { checked } }, todo) => {
    const newTodos = todos.map((_todo) => {
      if (_todo.id === todo.id) {
        return {
          // varre todos os todos e confere se e a mesma informacao para entao passar os valores todos e o checked
          ...todo,
          completed: checked,
        };
      }
      return _todo;
    });

    await axios.put(`/todo/${todo.id}`, {
      ...todo,
      completed: checked,
    });
    // put atualiza o valor

    setTodos(newTodos);
  };

  const onRemoveTodo = async (todo) => {
    // passa o obj todo completo dele tira pelo id
    const newTodos = todos.filter(({ id }) => id !== todo.id);
    // remove o valor passado pelo todoIndex deixando o demais, serve para remover itens de um array da melhor forma, o _ pq nao precisamos do valor
    //agora recebe-se 2 todos como parametro, o _todo è o filter, e o todo.id o passado como parametro da funcao
    //filter((_todo) => _todo.id !== _todo.id) podemos destruturar o todo e pegar somente o id, ficando (({id}) => id !== _todo.id);

    await axios.delete(`/todo/${todo.id}`);
    // a rota com o parametro a ser removido dinamico

    setTodos(newTodos);
  };

  const onEditTodo = (todo) => {
    // se o index que estou passando for o mesmo da lista, muda-se apenas o edit:, o Todo Index é o valor pego pelo map no novo array
    const newTodos = todos.map((_todo) => {
      if (_todo.id === todo.id) {
        return {
          ..._todo,
          edit: !_todo.edit,
          // aqui quando aceitamos apenas o oposto dele, salvara quando o valor for diferente dele mesmo!
        };
      }
      return _todo;
      // o return todo evita que se perca o valor, caso nao seja o valor que se queira editar
    });
    setTodos(newTodos);
  };

  const onChangeTodo = (event, index) => {
    const newTodos = todos.map((todo, todoIndex) => {
      if (todoIndex === index) {
        return {
          ...todo,
          title: event.target.value,
          // em vez do edit, pegamos o title com event target value para pegar o valor do input
        };
      }
      return todo;
      // o return todo evita que se perca o valor, caso nao seja o valor que se queira editar
    });
    setTodos(newTodos);
  };

  const onBlurField = async (todo) => {
    if (todo.title.trim()) {
      await axios.put(`/todo/${todo.id}`, {
        ...todo,
        edit: false,
      });
      onEditTodo(todo);
    } else {
      alert('Valor vazio');
    }
  };

  return (
    <Row className='m-2'>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.length ? 
            todos.map((todo, index) => (
              // checa se ja tem algum todo feito previamente
              <tr key={todo.id}>
                <td>
                  <input
                    onChange={(event) => onCompleteTodo(event, todo)}
                    checked={todo.completed}
                    className='m-2'
                    type='checkbox'
                  />
                </td>
                <td width='70%'>
                  {/* dentro de tags nao podemos usar if, somente ternarios */}
                  {todo.edit ? (
                    <input
                      onBlur={() => onBlurField(todo)}
                      value={todo.title}
                      onChange={(event) => onChangeTodo(event, index)}
                    />
                  ) : (
                    <Link to={`/todo/${todo.id}`} className={todo.completed ? 'completed' : ''}>
                      {todo.title}
                    </Link>
                  )}
                </td>
                <td>
                  <Button onClick={() => onEditTodo(todo)}>Editar</Button>
                  <Button
                    onClick={() => onRemoveTodo(todo)}
                    variant='danger'
                    className='ml-2'
                  >
                    Remover
                  </Button>
                </td>
              </tr>
          )) : (
            <tr>
              <td colSpan={3} align='center'>
                {todoError || 'No Data Found'}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Row>
  );
};

export default TodoList;

// // {/* <div className='todos'>
// //   {todos.map((todo, index) => (
// //     <Row
// //       key={index}
// //       className={`todo m-2 ${todo.completed ? 'completed' : ''}`}
// //     >
// //       {/* a key vem no primeiro componente do map */}
// //       <Col xl={8}>
// //         {/* dentro do componente return nao se pode fazer if and else, usar ternario */}
// //       </Col>
// //       <Col></Col>
// //     </Row>
// //   ))}
// // </div>; */}

// // const onChange = (event) => {
// //   setText(event.target.value);
// // };
// o event target value pega o valor que passa pelo input e atribui ao use State text pelo set Text

// const Paragrafo = ({ row, color = 'lightgray' }) => (
//   <div style={{ color }}>
//     <p>{`Paragrafo ${row}`}</p>
//     <p>{`Paragrafo ${row}`}</p>
//     <p>{`Paragrafo ${row}`}</p>
//   </div>
// );

// com as chaves apenas, ele reconhece apenas codigo html ou jsx
// com as {} ele reconhece tambem JS

// const onCloseAlert = () => {
//     setShow(!show);
//     alert('On Close ');
//   };

// const todos = [
//   {
//     title: 'Atividade',
//     complete: true,
//   },
//   {
//     title: 'Atividade 2',
//     complete: true,
//   },
// ];
