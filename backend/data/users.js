import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Maria Ivanova',
    email: 'maria@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Fashanya Williams',
    email: 'fashanya@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
