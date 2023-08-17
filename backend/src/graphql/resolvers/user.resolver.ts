import User from "../../models/user.model";
import redisClient from '../../redis';

const userResolver = {
  Query: {
    getUsers: async (_: any, { page, limit, sortField, sortOrder, searchQuery }: any) => {
      try {
        const cacheKey = `getUsers:${page}:${limit}:${sortField}:${sortOrder}:${searchQuery}`;
        
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          return JSON.parse(cachedData);
        }

        const skip = (page - 1) * limit;
        const query: any = {};
        if (searchQuery) {
          query.$or = [
            { name: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
            { phone: { $regex: searchQuery, $options: 'i' } },
            { linkedIn: { $regex: searchQuery, $options: 'i' } },
            { company: { $regex: searchQuery, $options: 'i' } },
          ];
        }
  
        const totalCount = await User.countDocuments(query);
        const users = await User.find(query)
          .sort({ [sortField]: sortOrder })
          .skip(skip)
          .limit(limit);

        const result = { users, totalCount };

        // Update the cache
        const cacheExpiration = 1800; // Cache for 30 minutes
        await redisClient.setex(cacheKey, cacheExpiration, JSON.stringify(result));

        return result;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
  },
};

export default userResolver;
