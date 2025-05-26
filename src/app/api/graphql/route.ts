import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import typeDefs from '@/graphql/schema';
import resolvers from '@/graphql/resolvers';
import { connectToDatabase } from '@/lib/mongodb';

// Connect to MongoDB
connectToDatabase();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export the handler
const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => {
    return {
      req,
    };
  },
});

// Export the GET and POST handlers
export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
