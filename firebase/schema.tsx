import firebase from 'firebase/compat/app'

export type Registration = {
  id: string
  nick: string
  name: string
  address: string
  email: string
  phone: string
  insurance: string
  dob: firebase.firestore.Timestamp
  allergies: string
  parent_name: string
  parent_address: string
  parent_email: string
  parent_phone: string
  terms: boolean
}
