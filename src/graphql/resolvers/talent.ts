import { Talent } from '@/models/Talent';

const talentResolvers = {
  Query: {
    talent: async (_: any, { id }: { id: string }) => {
      try {
        return await Talent.findById(id);
      } catch (error) {
        console.error('Error fetching talent:', error);
        throw new Error('Failed to fetch talent');
      }
    },
    searchTalents: async (_: any, { input }: { input: any }) => {
      try {
        const {
          query,
          skills,
          locations,
          experienceLevels,
          availabilities,
          limit = 10,
          offset = 0,
        } = input || {};

        // Build the filter
        const filter: any = {};

        // Text search
        if (query) {
          filter.$or = [
            { name: { $regex: query, $options: 'i' } },
            { title: { $regex: query, $options: 'i' } },
            { bio: { $regex: query, $options: 'i' } },
          ];
        }

        // Filter by skills
        if (skills && skills.length > 0) {
          filter.skills = { $in: skills };
        }

        // Filter by locations
        if (locations && locations.length > 0) {
          filter.location = { $in: locations.map((loc: string) => new RegExp(loc, 'i')) };
        }

        // Filter by experience levels
        if (experienceLevels && experienceLevels.length > 0) {
          // Convert experience levels to year ranges
          const yearRanges = experienceLevels.map((level: string) => {
            switch (level) {
              case 'Entry Level':
                return { $lte: 2 };
              case 'Mid Level':
                return { $gt: 2, $lte: 5 };
              case 'Senior':
                return { $gt: 5, $lte: 10 };
              case 'Expert':
                return { $gt: 10 };
              default:
                return {};
            }
          });

          if (yearRanges.length > 0) {
            filter.yearsOfExperience = { $or: yearRanges };
          }
        }

        // Filter by availability
        if (availabilities && availabilities.length > 0) {
          filter.availability = { $in: availabilities };
        }

        // Count total results
        const totalCount = await Talent.countDocuments(filter);

        // Execute the query with pagination
        const talents = await Talent.find(filter)
          .sort({ updatedAt: -1 })
          .skip(offset)
          .limit(limit);

        return {
          talents,
          totalCount,
          hasMore: offset + talents.length < totalCount,
        };
      } catch (error) {
        console.error('Error searching talents:', error);
        throw new Error('Failed to search talents');
      }
    },
  },
  Mutation: {
    createTalent: async (_: any, { input }: { input: any }) => {
      try {
        const talent = new Talent(input);
        await talent.save();
        return talent;
      } catch (error) {
        console.error('Error creating talent:', error);
        throw new Error('Failed to create talent');
      }
    },
    updateTalent: async (_: any, { id, input }: { id: string; input: any }) => {
      try {
        const talent = await Talent.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true, runValidators: true }
        );

        if (!talent) {
          throw new Error('Talent not found');
        }

        return talent;
      } catch (error) {
        console.error('Error updating talent:', error);
        throw new Error('Failed to update talent');
      }
    },
    deleteTalent: async (_: any, { id }: { id: string }) => {
      try {
        const result = await Talent.findByIdAndDelete(id);
        return !!result;
      } catch (error) {
        console.error('Error deleting talent:', error);
        throw new Error('Failed to delete talent');
      }
    },
  },
};

export default talentResolvers;
