import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const clientCredentials = {
  apiKey: 'AIzaSyDv2zr15MDlGV6GQbmHndRjCLVF6dVNvFA',
  authDomain: 'malenovsky-tabor.firebaseapp.com',
  projectId: 'malenovsky-tabor',
  storageBucket: 'malenovsky-tabor.appspot.com',
  messagingSenderId: '805492098725',
  appId: '1:805492098725:web:a2b0f86bdf8c72f32baf4c',
}

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials)
}

export default firebase
