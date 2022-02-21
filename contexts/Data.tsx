import { createContext } from 'react'

type Person = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

type Attendee = Person & {
  dateOfBirth: Date
  insurance: string
  parents: Person[]
  address: string
}

const Data = createContext({})

export default Data
