import React from 'react'

import firebaseApp from '../services/firebase-config'
import { getAuth, signOut } from 'firebase/auth'
import { Button, Container } from 'react-bootstrap'

const auth = getAuth(firebaseApp)

const Home = () => {
  //function handleSignOut
  const handleSignOut = () => {
    signOut(auth).catch(error => {
      console.log(error)
    })
  }
  return (
    <Container>
      <h1>Home</h1>
      <Button onClick={handleSignOut}>Sair</Button>
    </Container>
  )
}

export default Home
