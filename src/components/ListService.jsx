import React from 'react'
import { Container, Row, Stack, Col, Button } from 'react-bootstrap'

const ListService = ({ arrayService }) => {
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
                  <Button>Apagar</Button>
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
