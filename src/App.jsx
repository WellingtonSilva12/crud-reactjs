import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

import firebaseApp from './services/firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(firebaseApp)

function App() {
  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, userFirebase => {
    if (userFirebase) {
      // sessio init
      setUser(userFirebase)
    } else {
      // sessio no init
      setUser(null)
    }
  })

  return (
    <div className="App">
      {user ? <Home emailUser={user.email} /> : <Login />}
    </div>
  )
}

export default App
