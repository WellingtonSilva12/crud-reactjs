import React from 'react'
import { Container, Row, Stack, Col, Button } from 'react-bootstrap'

import firebaseApp from '../services/firebase-config'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)

const ListService = ({ arrayService, emailUser, setArrayService }) => {
  //delete data from firestore
  const deleteService = async idDeleteDoc => {
    // create a new array service
    const newArrayService = arrayService.filter(
      objectService => objectService.id !== idDeleteDoc
    )
    // update data base
    const docRef = doc(firestore, `user/${emailUser}`)
    updateDoc(docRef, { service: [...newArrayService] })

    // update state
    setArrayService(newArrayService)
  }

  return (
    <Container>
      <Stack>
        <h1>Lista de Serviços</h1>

        {arrayService.map(objectService => {
          return (
            <>
              <Row>
                <Row>
                  <Col>
                    <h6>Nome:</h6> <p>{objectService.client}</p>
                  </Col>
                  <Col>
                    <h6>Telefone:</h6>
                    <p>{objectService.contact}</p>
                  </Col>
                  <Col>
                    <Button onClick={() => deleteService(objectService.id)}>
                      Apagar
                    </Button>
                  </Col>
                </Row>
              </Row>
              <Col>
                <h6>Serviço:</h6>
                <p>{objectService.office}</p>
              </Col>
              <Row>
                <Col>
                  <h6>Tipo de Venda:</h6>
                  <p>{objectService.sale}</p>
                </Col>
                <Col>
                  <h6>Valor:</h6>
                  <p>{objectService.value}</p>
                </Col>
              </Row>
              <Col>
                <h6>Descrição do serviço:</h6>
                <p>{objectService.description}</p>
              </Col>
              <Col>
                <h6>Endereço:</h6>
                <p>{objectService.adress}</p>
              </Col>
              <Row>
                <Col>
                  <h6>Data do Pedido:</h6>
                  <p>{objectService.date_request}</p>
                </Col>
                <Col>
                  <h6>Data de Entrega:</h6>
                  <p>{objectService.date_delivery}</p>
                </Col>
              </Row>

              <hr />
            </>
          )
        })}
      </Stack>
    </Container>
  )
}

export default ListService
