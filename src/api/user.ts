// import { useQuery } from '@apollo/client';
// import { Admin } from './login.graphql';
// import { postsQueryDocument } from '@/graphql/generated';

// const client = new ApolloClient({
//   uri: 'http://localhost:3010/graphql',
//   cache: new InMemoryCache(),
//   headers: {
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja3l5N2NlYzYwMDA4aG92NWk1d3NxcGp4IiwiaWF0IjoxNjQzNjQyMDU5LCJleHAiOjE2NDM2NDIxNzl9.B9j-aFHR88fXWW4AfuA0dF6yVHGl0u5UR-M95M2XiVU' ||
//       null,
//   },
// });

// client
//   .mutate({
//     mutation: Admin,
//     variables: {
//       email: 'catlair@qq.com',
//       password: 'secret42',
//     },
//   })
//   .then((result) => console.log(result));

// client
//   .query({
//     query: gql`
//       query {
//         test {
//           title
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

// client
//   .mutate({
//     mutation: gql`
//       mutation Admin($email: String!, $password: String!) {
//         login(data: { email: $email, password: $password }) {
//           accessToken
//           refreshToken
//           user {
//             id
//             email
//           }
//         }
//       }
//     `,
//     variables: {
//       email: 'catlair@qq.com',
//       password: 'secret42',
//     },
//   })
//   .then((result) => console.log(result));
