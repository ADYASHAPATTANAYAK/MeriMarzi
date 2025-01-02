import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
    }
  }
`;

export const GET_CART = gql`
  query GetCart {
    cart {
      id
      items {
        product {
          id
          name
          price
          imageUrl
        }
        quantity
      }
      total
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      items {
        product {
          id
          name
          price
        }
        quantity
      }
      total
      status
      createdAt
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
    }
  }
`; 