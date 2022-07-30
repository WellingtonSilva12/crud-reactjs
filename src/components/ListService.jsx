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
        <h1>List Service</h1>

        {arrayService.map(objectService => {
          return (
            <>
              <Row>
                <Col>{objectService.description}</Col>

                <Col>
                  <Button>Ver Arquivo</Button>
                </Col>

                <Col>
                  <Button onClick={() => deleteService(objectService.id)}>
                    Apagar
                  </Button>
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
