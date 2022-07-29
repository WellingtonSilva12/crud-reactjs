import React from 'react'
import AddService from '../components/AddService'
import ListService from '../components/ListService'

import firebaseApp from '../services/firebase-config'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import { Button, Container } from 'react-bootstrap'

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

const Home = ({ emailUser }) => {
  const fakeData = [
    {
      id: 1,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      url: 'https://picsum.photos/420'
    },
    {
      id: 2,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      url: 'https://picsum.photos/425'
    },
    {
      id: 3,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      url: 'https://picsum.photos/422'
    }
  ]

  // function search doc or create doc
  const findDocCreateDoc = async idDoc => {
    // create reference document
    const docRef = doc(firestore, `user/${idDoc}`)

    // find document
    const query = await getDoc(docRef)

    // check if exist
    if (query.exists()) {
      const infoDoc = query.data()

      return infoDoc.service
    } else {
    }
  }

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
      <hr />

      {/* <AddService /> */}
      <ListService arrayService={fakeData} />
    </Container>
  )
}

export default Home
