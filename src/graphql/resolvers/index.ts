import companyResolvers from './company';
import talentResolvers from './talent';

// Merge all resolvers
const resolvers = {
  Query: {
    ...companyResolvers.Query,
    ...talentResolvers.Query,
  },
  Mutation: {
    ...companyResolvers.Mutation,
    ...talentResolvers.Mutation,
  },
};

export default resolvers;
