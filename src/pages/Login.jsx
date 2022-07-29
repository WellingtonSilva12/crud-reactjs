import React, { useState } from 'react'
import { Container, Form, Button, Stack } from 'react-bootstrap'

import firebaseApp from '../services/firebase-config'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
const auth = getAuth(firebaseApp)

const Login = () => {
  const [authUser, setAuthUser] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const email = e.target.formBasicEmail.value
    const password = e.target.formBasicPassword.value

    if (authUser) {
      // create acount
      const user = await createUserWithEmailAndPassword(auth, email, password)
    } else {
      // sign in
      signInWithEmailAndPassword(auth, email, password)
    }
  }

  return (
    <Container>
      <Stack gap={3}>
        <h1> {authUser ? 'Crie sua Conta' : 'Acessar sua conta'}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Digite seu e-mail" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button variant="dark" type="submit" style={{ width: '300px' }}>
            {authUser ? 'Cadastrar' : 'Login'}
          </Button>
        </Form>
        <Button variant="primary" type="submit" style={{ width: '300px' }}>
          Entrar com Google
        </Button>
        <Button
          style={{ width: '300px' }}
          variant="primary"
          onClick={() => setAuthUser(!authUser)}
        >
          {authUser
            ? 'Já tem uma conta? Acesse sua conta'
            : 'Não tem uma conta? Registre-se'}
        </Button>
      </Stack>
    </Container>
  )
}

export default Login
