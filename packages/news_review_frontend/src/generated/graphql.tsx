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

export type Article = {
  __typename?: 'Article';
  author: UserEntity;
  body: Scalars['String'];
  created_at: Scalars['DateTime'];
  /** Article ID */
  id: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type CreateArticleInput = {
  /** Body of the Article */
  body: Scalars['String'];
  /** Article Title */
  title: Scalars['String'];
};

export type CreateReviewInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type FetchArticleInput = {
  id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReview: Review;
  create_article: Article;
  create_user: StandardResponseModel;
  removeArticle: StandardResponseModel;
  removeReview: Review;
  updateArticle: Article;
  updateReview: Review;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationCreate_ArticleArgs = {
  createArticleInput: CreateArticleInput;
};


export type MutationCreate_UserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveArticleArgs = {
  removeArticleInput: RemoveArticleInput;
};


export type MutationRemoveReviewArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateArticleArgs = {
  updateArticleInput: UpdateArticleInput;
};


export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput;
};

export type Query = {
  __typename?: 'Query';
  fetch_all_articles: Array<Article>;
  fetch_one_article: Article;
  review: Review;
};


export type QueryFetch_One_ArticleArgs = {
  fetchArticleInput: FetchArticleInput;
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};

export enum Roles {
  Admin = 'ADMIN',
  User = 'USER'
}

export type RemoveArticleInput = {
  id: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type StandardResponseModel = {
  __typename?: 'StandardResponseModel';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type UpdateArticleInput = {
  /** Body of the Article */
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  /** Article Title */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateReviewInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  articles: Array<Article>;
  email?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  id: Scalars['String'];
  last_name: Scalars['String'];
  role: Roles;
  username: Scalars['String'];
};

export type ArticleFragmentFragment = { __typename?: 'Article', id: string, title: string, body: string, created_at: any, updated_at: any, author: { __typename?: 'UserEntity', id: string, username: string, first_name: string, last_name: string } };

export type FetchAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllArticlesQuery = { __typename?: 'Query', fetch_all_articles: Array<{ __typename?: 'Article', id: string, title: string, body: string, created_at: any, updated_at: any, author: { __typename?: 'UserEntity', id: string, username: string, first_name: string, last_name: string } }> };

export type FetchOneArticleQueryVariables = Exact<{
  fetchArticleInput: FetchArticleInput;
}>;


export type FetchOneArticleQuery = { __typename?: 'Query', fetch_one_article: { __typename?: 'Article', id: string, title: string, body: string, created_at: any, updated_at: any, author: { __typename?: 'UserEntity', id: string, username: string, first_name: string, last_name: string } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', create_user: { __typename?: 'StandardResponseModel', success: boolean, message: string } };

export const ArticleFragmentFragmentDoc = gql`
    fragment ArticleFragment on Article {
  id
  title
  body
  created_at
  updated_at
  author {
    id
    username
    first_name
    last_name
  }
}
    `;
export const FetchAllArticlesDocument = gql`
    query FetchAllArticles {
  fetch_all_articles {
    ...ArticleFragment
  }
}
    ${ArticleFragmentFragmentDoc}`;

/**
 * __useFetchAllArticlesQuery__
 *
 * To run a query within a React component, call `useFetchAllArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllArticlesQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllArticlesQuery, FetchAllArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllArticlesQuery, FetchAllArticlesQueryVariables>(FetchAllArticlesDocument, options);
      }
export function useFetchAllArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllArticlesQuery, FetchAllArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllArticlesQuery, FetchAllArticlesQueryVariables>(FetchAllArticlesDocument, options);
        }
export type FetchAllArticlesQueryHookResult = ReturnType<typeof useFetchAllArticlesQuery>;
export type FetchAllArticlesLazyQueryHookResult = ReturnType<typeof useFetchAllArticlesLazyQuery>;
export type FetchAllArticlesQueryResult = Apollo.QueryResult<FetchAllArticlesQuery, FetchAllArticlesQueryVariables>;
export const FetchOneArticleDocument = gql`
    query FetchOneArticle($fetchArticleInput: FetchArticleInput!) {
  fetch_one_article(fetchArticleInput: $fetchArticleInput) {
    ...ArticleFragment
  }
}
    ${ArticleFragmentFragmentDoc}`;

/**
 * __useFetchOneArticleQuery__
 *
 * To run a query within a React component, call `useFetchOneArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchOneArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchOneArticleQuery({
 *   variables: {
 *      fetchArticleInput: // value for 'fetchArticleInput'
 *   },
 * });
 */
export function useFetchOneArticleQuery(baseOptions: Apollo.QueryHookOptions<FetchOneArticleQuery, FetchOneArticleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchOneArticleQuery, FetchOneArticleQueryVariables>(FetchOneArticleDocument, options);
      }
export function useFetchOneArticleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchOneArticleQuery, FetchOneArticleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchOneArticleQuery, FetchOneArticleQueryVariables>(FetchOneArticleDocument, options);
        }
export type FetchOneArticleQueryHookResult = ReturnType<typeof useFetchOneArticleQuery>;
export type FetchOneArticleLazyQueryHookResult = ReturnType<typeof useFetchOneArticleLazyQuery>;
export type FetchOneArticleQueryResult = Apollo.QueryResult<FetchOneArticleQuery, FetchOneArticleQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  create_user(createUserInput: $createUserInput) {
    success
    message
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;