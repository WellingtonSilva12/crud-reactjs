import React, { useState } from 'react'
import { Container, Form, Button, Stack } from 'react-bootstrap'

import firebaseApp from '../services/firebase-config'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()

const Login = () => {
  const [authUser, setAuthUser] = useState(false)

  //login with email and password
  const handleSubmit = async e => {
    e.preventDefault()
    const email = e.target.formBasicEmail.value
    const password = e.target.formBasicPassword.value

    if (authUser) {
      // create acount
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch(error => {
        console.log(error)
        if (password.length < 6) {
          return alert('A senha deve possuir pelo menos 6 caracteres.')
        }
      })
    } else {
      // sign in
      signInWithEmailAndPassword(auth, email, password).catch(error => {
        console.log(error)
        //error handling
        if (error.code === 'auth/invalid-email') {
          return alert('E-mail inválido')
        }
        if (error.code === 'auth/wrong-password') {
          return alert('E-mail ou Senha inválida.')
        }
        if (error.code === 'auth/user-not-found') {
          return alert('E-mail ou Senha inválida.')
        }
        return alert('Não foi possivel acessar.')
      })
    }
  }

  // login with google account
  const handleSubmitGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
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
        <Button
          variant="primary"
          type="submit"
          style={{ width: '300px' }}
          onClick={handleSubmitGoogle}
        >
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
