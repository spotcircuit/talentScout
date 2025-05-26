'use client';

import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider, HttpLink } from '@apollo/client';
import { useState, useEffect } from 'react';

// Create a function to create a new Apollo Client instance
function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: '/api/graphql',
      // Include credentials for cross-origin requests if needed
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

// Apollo Provider component
export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    // Create the Apollo client on the client-side
    setClient(createApolloClient());
  }, []);

  // Wait until Apollo client is initialized
  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}

export default ApolloProvider;
