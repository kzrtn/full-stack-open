const { GraphQLError } = require('graphql')
const Person = require('./models/person')

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      const test = await Person.find({})
      return test
    },
    findPerson: (root, args) => Person.findOne({ name: args.name })
  },
  Person: {
    phone: (root) => root.number,
    address: ({ street, city }) => {
      return {
        street: street,
        city: city
      }
    }
  },
  Mutation: {
    addPerson: async (root, args) => {
      const nameExists = await Person.exists({ name: args.name })
      if (nameExists) {
        throw new GraphQLError(`Name must be unique: ${args.name}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          }
        })
      }
      const person = new Person({ ...args })
      return person.save()
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (!person) return null

      person.phone = args.phone
      return person.save()
    }
  }
}

module.exports = resolvers