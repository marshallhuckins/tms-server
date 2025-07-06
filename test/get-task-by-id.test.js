const app = require('../src/app');
const request = require('supertest');
const mongoose = require('mongoose');
const Task = require('../src/models/task.model');

jest.setTimeout(20000); // Increase for Atlas

let createdTaskId;

beforeAll(async () => {
  // Wait for mongoose to connect if it isn't yet
  const waitForConnection = async () => {
    let retries = 0;
    while (mongoose.connection.readyState !== 1) {
      if (retries > 10) {
        throw new Error('Mongoose failed to connect in time. Is your server running?');
      }
      console.log('Waiting for MongoDB connection...');
      await new Promise(res => setTimeout(res, 1000)); // wait 1 second
      retries++;
    }
  };

  await waitForConnection();

  // Create a test task to fetch by ID
  const task = await Task.create({
    title: "Test Task for GET by ID",
    description: "Testing fetch by ID",
    status: "Pending",
    priority: "High",
    dueDate: new Date(),
    dateCreated: new Date(),
    dateModified: new Date(),
    projectId: 1001
  });
  createdTaskId = task._id.toString();
  console.log("Created test task with ID:", createdTaskId);
});

afterAll(async () => {
  await Task.findByIdAndDelete(createdTaskId);
  // Do not close mongoose connection here to avoid interfering with other tests
});

describe("GET /api/tasks/:id", () => {
  it("should return a task by valid ID", async () => {
    const res = await request(app).get(`/api/tasks/${createdTaskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdTaskId);
    expect(res.body).toHaveProperty('title', 'Test Task for GET by ID');
  });

  it("should return 404 for non-existent task", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/tasks/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Task not found');
  });

  it("should return 400 for invalid ID format", async () => {
    const res = await request(app).get('/api/tasks/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid Task ID format');
  });
});
