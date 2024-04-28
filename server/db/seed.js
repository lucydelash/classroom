const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

async function seed() {
  console.log("Seeding the database.");
  try {
    // clear database.
    await prisma.instructor.deleteMany();
    await prisma.student.deleteMany();

    // add 5 instructors.
    const instructors = [];
    for (let i = 0; i < 5; i++) {
      const instructor = await prisma.instructor.create({
        data: {
          username: faker.internet.userName(),
          password: faker.internet.password()
        }
      });
      instructors.push(instructor);
    }

    // add 4 students for each instructor.
    for (let i = 0; i < 20; i++) {
      await prisma.student.create({
        data: {
          name: faker.person.fullName(),
          cohort: faker.datatype.number({ min: 2000, max: 3000 }),
          instructorId: instructors[i % 5].id
        }
      });
    }

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

// seed the database
if (require.main === module) {
  seed();
}