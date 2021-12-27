import { gql } from 'graphql-request';

export const GET_CATEGORIES_AND_SUBATEGORIES = gql`
  query {
    category {
      name
      _id
    }
    subCategory {
      name
      _id
    }
  }
`;

export const createCategory = (categoryName) => gql`
  mutation {
    createCategory(categoryInput: { name: "${categoryName}" }) {
      name
      _id
    }
  }
`;

export const createSubCategory = (subCategoryName) => gql`
  mutation {
    createSubCategory(subCategoryInput: { name: "${subCategoryName}" }) {
      name
      _id
    }
  }
`;

export const createTransaction = (transaction) => gql`
  mutation {
    createTransaction(
      transactionInput: {
        name: "${transaction.name}"
        value: ${transaction.value}
        date: "${new Date(transaction.date)}"
        category: "${transaction.category}"
        subCategory: "${transaction.subCategory}"
      }
    ) {
      name
      _id
      value
      category {
        name
      }
      subCategory {
        name
      }
    }
  }
`;
