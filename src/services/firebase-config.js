import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCuWZUBJllhkl-I8nSLncyXEC6Wiq-5yGA',
  authDomain: 'auth-dd56b.firebaseapp.com',
  projectId: 'auth-dd56b',
  storageBucket: 'auth-dd56b.appspot.com',
  messagingSenderId: '615734004529',
  appId: '1:615734004529:web:85aed3326c89b1b92d3e10'
}

const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
