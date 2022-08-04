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
  async function handleSubmitRegister(e) {
    e.preventDefault()
    const client = e.target.formClient.value
    const contact = e.target.formContact.value
    const office = e.target.formOffice.value
    const sale = e.target.formSale.value
    const value = e.target.formValue.value
    const description = e.target.formDescription.value
    const adress = e.target.formAdress.value
    const date_request = e.target.formDateRequest.value
    const date_delivery = e.target.formDateDelivery.value
    const status = e.target.formStatus.value

    // crear nuevo array de tareas
    const newArrayService = [
      ...arrayService,
      {
        client: client,
        contact: contact,
        office: office,
        sale: sale,
        value: value,
        description: description,
        adress: adress,
        date_request: date_request,
        date_delivery: date_delivery,
        status: status,
        id: +new Date()
      }
    ]
    // actualizar base de datos
    const docuRef = doc(firestore, `user/${emailUser}`)
    updateDoc(docuRef, { service: [...newArrayService] })
    //actualizar estado
    setArrayService(newArrayService)
    // limpiar form
    e.target.formClient.value = ''
    e.target.formContact.value = ''
    e.target.formOffice.value = ''
    e.target.formSale.value = 'Vendas:'
    e.target.formValue.value = ''
    e.target.formDescription.value = ''
    e.target.formAdress.value = ''
    e.target.formDateRequest.value = ''
    e.target.formDateDelivery.value = ''
    e.target.formStatus.value = 'Status de Produção'
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
              <Form.Control type="text" placeholder="Serviço" id="formOffice" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select className="mb-2" id="formSale">
                <option>Vendas:</option>
                <option value="Site">Site</option>
                <option value="Shopee">Shopee</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="Presencial">Presencial</option>
              </Form.Select>
            </Col>
            <Col className="mb-2">
              <Form.Control type="text" placeholder="Valor" id="formValue" />
            </Col>
          </Row>

          <Row className="m-1">
            <Form.Control
              type="text"
              placeholder="Descrição do serviço"
              id="formDescription"
            />
          </Row>
          <Row className="m-1">
            <Form.Control type="text" placeholder="Endereço" id="formAdress" />
          </Row>
          <Row>
            <Col className="m-1">
              <Form.Control
                type="text"
                placeholder="Data do pedido"
                id="formDateRequest"
              />
            </Col>
            <Col className="mb-4">
              <Form.Control
                type="text"
                placeholder="Data da entrega"
                id="formDateDelivery"
              />
            </Col>
            <Row>
              <Col>
                <Form.Select className="mb-2" id="formStatus">
                  <option>Status de Produção:</option>
                  <option value="Criação de Arte">Criação de Arte</option>
                  <option value="Produção do Material">
                    Produção do Material
                  </option>
                  <option value="Material Feito">Material Feito</option>
                  <option value="Entregue">Entregue</option>
                </Form.Select>
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
