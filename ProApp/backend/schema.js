const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    imageUrl: String
  }

  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
  }

  type Cart {
    id: ID!
    items: [CartItem!]!
    total: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Query {
    products: [Product]!
    product(id: ID!): Product
    cart: Cart
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addToCart(productId: ID!, quantity: Int!): Cart
    removeFromCart(productId: ID!): Cart
    updateCartQuantity(productId: ID!, quantity: Int!): Cart
  }
`;

module.exports = typeDefs; 