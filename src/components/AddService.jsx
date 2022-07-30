import React from 'react'
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Stack,
  FormLabel
} from 'react-bootstrap'

import firebaseApp from '../services/firebase-config'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)

const AddService = ({ emailUser, setArrayService, arrayService }) => {
  let urlDescarga = 'https://picsum.photos/422'

  async function handleSubmitRegister(e) {
    e.preventDefault()
    const description = e.target.formDescription.value
    const client = e.target.formClient.value
    const contact = e.target.formContact.value
    // crear nuevo array de tareas
    const newArrayService = [
      ...arrayService,
      {
        client: client,
        contact: contact,
        id: +new Date(),
        description: description,
        url: urlDescarga
      }
    ]
    // actualizar base de datos
    const docuRef = doc(firestore, `user/${emailUser}`)
    updateDoc(docuRef, { service: [...newArrayService] })
    //actualizar estado
    setArrayService(newArrayService)
    // limpiar form
    e.target.formDescription.value = ''
    e.target.formClient.value = ''
    e.target.formContact.value = ''
  }

  return (
    <Container>
      <Stack>
        <Form onSubmit={handleSubmitRegister}>
          <Row>
            <Col className="mb-2">
              <Form.Control
                type="text"
                placeholder="Nome do Cliente"
                id="formClient"
              />
            </Col>
            <Col className="mb-2">
              <Form.Control
                type="text"
                placeholder="Contato"
                id="formContact"
              />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginBottom: '10px' }}>
              <Form.Control type="text" placeholder="Serviço" />
            </Col>
            <Col className="mb-2">
              <Form.Control type="text" placeholder="Valor" />
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Row>
              <Col>
                <FormLabel>Vendas:</FormLabel>
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Site" />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Shopee" />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Whatsapp" />
              </Col>
            </Row>
          </Form.Group>

          <Row className="mb-2">
            <Form.Control
              type="text"
              placeholder="Descrição do serviço"
              id="formDescription"
            />
          </Row>
          <Row className="mb-2 m-lg-3">
            <Form.Control type="text" placeholder="Endereço" />
          </Row>
          <Row>
            <Col className="mb-2">
              <Form.Control type="text" placeholder="Data do pedido" />
            </Col>
            <Col className="mb-4">
              <Form.Control type="text" placeholder="Data da entrega" />
            </Col>
            <Row>
              <Col>
                <FormLabel>Status:</FormLabel>
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Arte" />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Produção" />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Feito" />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Entregue" />
              </Col>
            </Row>
          </Row>

          {/* button register os */}
          <Row className="mb-2">
            <Button type="submit" style={{ width: '300px' }}>
              Cadastrar OS
            </Button>
          </Row>
        </Form>
      </Stack>
    </Container>
  )
}

export default AddService
