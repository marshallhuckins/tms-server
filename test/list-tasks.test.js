const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');
const Task = require('../src/models/task.model');

jest.setTimeout(20000); // Extend timeout for Atlas connections

beforeAll(async () => {
  try {
    const mongoURI = 'mongodb+srv://web335Admin:Password01@tms-cluster.ebh5hd3.mongodb.net/tms?retryWrites=true&w=majority&appName=tms-cluster';
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB for tests.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Fail tests if unable to connect
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    await new Promise(resolve => setTimeout(resolve, 500)); // Ensure Jest exits cleanly
    console.log("MongoDB connection closed after tests.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
});

describe('GET /api/tasks', () => {

  it('should return all tasks with status 200', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return an empty array if no tasks exist', async () => {
    await Task.deleteMany({});
    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should handle server errors', async () => {
    const originalFind = Task.find;
    Task.find = jest.fn().mockRejectedValue(new Error('Server error'));

    const response = await request(app).get('/api/tasks');
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message');

    Task.find = originalFind; // Restore original method after test
  });
});
