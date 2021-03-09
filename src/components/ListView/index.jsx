import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import axios from '../../utils/api';
import Card from '../Card';
import Table from '../Table/';

export default function Index({ title, columns, endpoint }) {
  // pega as informacoes via props
  const [rows, setRows] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(endpoint);
    setRows(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className='mt-5'>
      <Card title={title}>
        <Table columns={columns} rows={rows} />
      </Card>
    </Container>
  );
}
