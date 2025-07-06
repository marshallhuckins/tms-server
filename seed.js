const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://web335Admin:Password01@tms-cluster.ebh5hd3.mongodb.net/tms?retryWrites=true&w=majority&appName=tms-cluster';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error(err));

// Define your schemas
const projectSchema = new mongoose.Schema({
  projectId: Number,
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  dateCreated: Date,
  dateModified: Date
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: String,
  dueDate: Date,
  dateCreated: Date,
  dateModified: Date,
  projectId: Number
});

const Project = mongoose.model('Project', projectSchema);
const Task = mongoose.model('Task', taskSchema);

async function seedDatabase() {
  try {
    await Project.deleteMany({});
    await Task.deleteMany({});

    const project1 = await Project.create({
      projectId: 1001,
      name: 'Project Apollo',
      description: 'Launch website redesign',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-08-01'),
      dateCreated: new Date(),
      dateModified: new Date()
    });

    const project2 = await Project.create({
      projectId: 1002,
      name: 'Project Orion',
      description: 'Develop mobile app',
      startDate: new Date('2025-07-10'),
      endDate: new Date('2025-09-10'),
      dateCreated: new Date(),
      dateModified: new Date()
    });

    await Task.create([
      {
        title: 'Design homepage mockup',
        description: 'Create Figma designs for the new homepage',
        status: 'Pending',
        priority: 'High',
        dueDate: new Date('2025-07-10'),
        dateCreated: new Date(),
        dateModified: new Date(),
        projectId: 1001
      },
      {
        title: 'Set up MongoDB Atlas',
        description: 'Configure database for the mobile app',
        status: 'In Progress',
        priority: 'Medium',
        dueDate: new Date('2025-07-15'),
        dateCreated: new Date(),
        dateModified: new Date(),
        projectId: 1002
      },
      {
        title: 'Develop user authentication',
        description: 'Add login and signup functionality',
        status: 'Pending',
        priority: 'High',
        dueDate: new Date('2025-07-20'),
        dateCreated: new Date(),
        dateModified: new Date(),
        projectId: 1002
      }
    ]);

    console.log('Database seeded successfully.');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
