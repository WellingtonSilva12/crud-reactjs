import React, { useState, useEffect } from 'react'
import AddService from '../components/AddService'
import ListService from '../components/ListService'

import firebaseApp from '../services/firebase-config'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import { Button, Container } from 'react-bootstrap'
import ListServiceDetails from '../components/ListServiceDetails'

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

const Home = ({ emailUser, pageRegister }) => {
  const [arrayService, setArrayService] = useState(null)

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
      await setDoc(docRef, { service: [...fakeData] })
      const query = await getDoc(docRef)
      const infoDoc = query.data()
      return infoDoc.service
    }
  }

  useEffect(() => {
    const fetchService = async () => {
      const servicesClosed = await findDocCreateDoc(emailUser)

      setArrayService(servicesClosed)
    }

    fetchService()
  }, [])

  //function handleSignOut
  const handleSignOut = () => {
    signOut(auth).catch(error => {
      console.log(error)
    })
  }
  return (
    <>
      <Container>
        <h1>Home</h1>
        <Button className="m-1" onClick={pageRegister}>
          Cadastrar
        </Button>

        <Button variant="dark" onClick={handleSignOut}>
          Sair
        </Button>
        <hr />

        <AddService
          arrayService={arrayService}
          setArrayService={setArrayService}
          emailUser={emailUser}
        />

        {arrayService ? (
          <ListService
            arrayService={arrayService}
            setArrayService={setArrayService}
            emailUser={emailUser}
          />
        ) : null}
      </Container>
    </>
  )
}

export default Home
