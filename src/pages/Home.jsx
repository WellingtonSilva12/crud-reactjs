import React from 'react'
import firebaseApp from '../services/firebase-config'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth(firebaseApp)

const Home = () => {
  //function handleSignOut
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert('SignOut successful')
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sair</button>
    </div>
  )
}

export default Home
