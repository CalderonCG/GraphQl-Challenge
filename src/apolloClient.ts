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
          characters: {
            keyArgs: false, // ignorar variables, tratar todo como una lista continua
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
