import { Company } from '@/models/Company';

const companyResolvers = {
  Query: {
    company: async (_: any, { id }: { id: string }) => {
      try {
        return await Company.findById(id);
      } catch (error) {
        console.error('Error fetching company:', error);
        throw new Error('Failed to fetch company');
      }
    },
    searchCompanies: async (_: any, { input }: { input: any }) => {
      try {
        const {
          query,
          industries,
          locations,
          sizes,
          hiringStatuses,
          techStacks,
          limit = 10,
          offset = 0,
        } = input || {};

        // Build the filter
        const filter: any = {};

        // Text search
        if (query) {
          filter.$or = [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { specialities: { $regex: query, $options: 'i' } },
          ];
        }

        // Filter by industries
        if (industries && industries.length > 0) {
          filter.industry = { $in: industries };
        }

        // Filter by locations
        if (locations && locations.length > 0) {
          filter.headquarters = { $in: locations.map((loc: string) => new RegExp(loc, 'i')) };
        }

        // Filter by company sizes
        if (sizes && sizes.length > 0) {
          filter.companySize = { $in: sizes };
        }

        // Filter by hiring statuses
        if (hiringStatuses && hiringStatuses.length > 0) {
          filter.hiringStatus = { $in: hiringStatuses };
        }

        // Filter by tech stack
        if (techStacks && techStacks.length > 0) {
          filter.techStack = { $in: techStacks };
        }

        // Count total results
        const totalCount = await Company.countDocuments(filter);

        // Execute the query with pagination
        const companies = await Company.find(filter)
          .sort({ updatedAt: -1 })
          .skip(offset)
          .limit(limit);

        return {
          companies,
          totalCount,
          hasMore: offset + companies.length < totalCount,
        };
      } catch (error) {
        console.error('Error searching companies:', error);
        throw new Error('Failed to search companies');
      }
    },
  },
  Mutation: {
    createCompany: async (_: any, { input }: { input: any }) => {
      try {
        const company = new Company(input);
        await company.save();
        return company;
      } catch (error) {
        console.error('Error creating company:', error);
        throw new Error('Failed to create company');
      }
    },
    updateCompany: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const company = await Company.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true, runValidators: true }
        );

        if (!company) {
          throw new Error('Company not found');
        }

        return company;
      } catch (error) {
        console.error('Error updating company:', error);
        throw new Error('Failed to update company');
      }
    },
    deleteCompany: async (_: any, { id }: { id: string }) => {
      try {
        const result = await Company.findByIdAndDelete(id);
        return !!result;
      } catch (error) {
        console.error('Error deleting company:', error);
        throw new Error('Failed to delete company');
      }
    },
  },
};

export default companyResolvers;
