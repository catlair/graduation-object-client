import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};

export type Captcha = {
  __typename?: 'Captcha';
  /** captcha key */
  key: Scalars['String'];
  /** svg captcha */
  svg: Scalars['String'];
};

export type ChangeEmail = {
  __typename?: 'ChangeEmail';
  email: Scalars['String'];
  userId: Scalars['String'];
};

export type ChangeEmailInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type ChangePasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type CreateCourseManyInput = {
  names: Array<Scalars['String']>;
};

export type Email = {
  __typename?: 'Email';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  password: Scalars['String'];
};

export type Logout = {
  __typename?: 'Logout';
  message?: Maybe<Scalars['String']>;
};

export type Many = {
  __typename?: 'Many';
  count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail: ChangeEmail;
  changePassword: User;
  createCourse: Course;
  createCourseMany: Many;
  login: Auth;
  logout: Logout;
  refreshToken: Token;
  removeCourse: Course;
  removeCourseMany: Course;
  signup: Auth;
  updateCourse: Course;
  updateEmail: ChangeEmail;
  updateUser: User;
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateCourseManyArgs = {
  data: CreateCourseManyInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationLogoutArgs = {
  token: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationRemoveCourseManyArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateCourseArgs = {
  id: Scalars['String'];
};


export type MutationUpdateEmailArgs = {
  data: UpdateEmailInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  captcha: Captcha;
  course: Course;
  emailCode: Email;
  me: User;
  validateCaptcha: ValidateCaptcha;
};


export type QueryCourseArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type QueryEmailCodeArgs = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};


export type QueryValidateCaptchaArgs = {
  code: Scalars['String'];
  key: Scalars['String'];
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  Director = 'DIRECTOR',
  Secretary = 'SECRETARY',
  Teacher = 'TEACHER',
  ViceDirector = 'VICE_DIRECTOR'
}

export type SignupInput = {
  college?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  password: Scalars['String'];
  roles?: InputMaybe<Array<Role>>;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
};

export type UpdateEmailInput = {
  key: Scalars['String'];
  userId: Scalars['Int'];
};

export type UpdateUserInput = {
  college?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  college?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  roles?: Maybe<Array<Role>>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type ValidateCaptcha = {
  __typename?: 'ValidateCaptcha';
  code?: Maybe<Scalars['String']>;
  valid: Scalars['Boolean'];
};

export type AuthUserMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type AuthUserMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: number, email: string, college?: string | null, name: string, roles?: Array<Role> | null } } };

export type AddUserMutationVariables = Exact<{
  input: SignupInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', signup: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: number, email: string, college?: string | null, name: string, roles?: Array<Role> | null } } };

export type LogoutMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Logout', message?: string | null } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Token', accessToken: string, refreshToken: string } };

export type UserDataFragment = { __typename?: 'User', id: number, email: string, college?: string | null, name: string, roles?: Array<Role> | null };

export type AuthTokensFragment = { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'User', id: number, email: string, college?: string | null, name: string, roles?: Array<Role> | null } };

export type TokenDataFragment = { __typename?: 'Token', accessToken: string, refreshToken: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, email: string, college?: string | null, name: string, roles?: Array<Role> | null } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email: string, college?: string | null, name: string, roles?: Array<Role> | null } };

export type ChangeEmailMutationVariables = Exact<{
  data: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'ChangeEmail', email: string, userId: string } };

export type UpdateEmailMutationVariables = Exact<{
  data: UpdateEmailInput;
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateEmail: { __typename?: 'ChangeEmail', email: string, userId: string } };

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', id: number, email: string, college?: string | null, name: string, roles?: Array<Role> | null } };

export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  id
  email
  college
  name
  roles
}
    `;
export const AuthTokensFragmentDoc = gql`
    fragment AuthTokens on Auth {
  accessToken
  refreshToken
  user {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export const TokenDataFragmentDoc = gql`
    fragment TokenData on Token {
  accessToken
  refreshToken
}
    `;
export const AuthUserDocument = gql`
    mutation AuthUser($loginInput: LoginInput!) {
  login(data: $loginInput) {
    ...AuthTokens
  }
}
    ${AuthTokensFragmentDoc}`;
export type AuthUserMutationFn = Apollo.MutationFunction<AuthUserMutation, AuthUserMutationVariables>;

/**
 * __useAuthUserMutation__
 *
 * To run a mutation, you first call `useAuthUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authUserMutation, { data, loading, error }] = useAuthUserMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useAuthUserMutation(baseOptions?: Apollo.MutationHookOptions<AuthUserMutation, AuthUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthUserMutation, AuthUserMutationVariables>(AuthUserDocument, options);
      }
export type AuthUserMutationHookResult = ReturnType<typeof useAuthUserMutation>;
export type AuthUserMutationResult = Apollo.MutationResult<AuthUserMutation>;
export type AuthUserMutationOptions = Apollo.BaseMutationOptions<AuthUserMutation, AuthUserMutationVariables>;
export const AddUserDocument = gql`
    mutation AddUser($input: SignupInput!) {
  signup(data: $input) {
    ...AuthTokens
  }
}
    ${AuthTokensFragmentDoc}`;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($refreshToken: String!) {
  logout(token: $refreshToken) {
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    ...TokenData
  }
}
    ${TokenDataFragmentDoc}`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($data: ChangeEmailInput!) {
  changeEmail(data: $data) {
    email
    userId
  }
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const UpdateEmailDocument = gql`
    mutation UpdateEmail($data: UpdateEmailInput!) {
  updateEmail(data: $data) {
    email
    userId
  }
}
    `;
export type UpdateEmailMutationFn = Apollo.MutationFunction<UpdateEmailMutation, UpdateEmailMutationVariables>;

/**
 * __useUpdateEmailMutation__
 *
 * To run a mutation, you first call `useUpdateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailMutation, { data, loading, error }] = useUpdateEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmailMutation, UpdateEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument, options);
      }
export type UpdateEmailMutationHookResult = ReturnType<typeof useUpdateEmailMutation>;
export type UpdateEmailMutationResult = Apollo.MutationResult<UpdateEmailMutation>;
export type UpdateEmailMutationOptions = Apollo.BaseMutationOptions<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;