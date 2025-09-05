import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: { //Merge new fetch with last result
            keyArgs: false, 
            merge(existing = {}, incoming) {
              return {
                ...incoming,
                results: [
                  ...(existing.results || []),
                  ...(incoming.results || []),
                ],
              };
            },
          },
        },
      },
    },
  }),
});
