import mongoose from "mongoose";
import User from "../models/user.model";
import { faker } from '@faker-js/faker';

const batchSize = 5000; // Number of records per batch

mongoose.connect('mongodb+srv://aibak:aibak@cluster0.xcyb4oi.mongodb.net/userProfile?retryWrites=true&w=majority', {
});

const seedData = async () => {
  try {
    const totalRecords = 1000000; // Total number of records to insert
    const totalBatches = Math.ceil(totalRecords / batchSize);

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const batch = [];

      for(let i = 0; i < batchSize; i++) {
        const user = {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          company: faker.company.name(),
          linkedIn: faker.internet.url(),
        };

        batch.push(user);
      }

      await User.insertMany(batch);
      console.log(`Batch ${batchIndex + 1} inserted`);
    }

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();


