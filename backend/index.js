const fastify = require('fastify')({ logger: true });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

fastify.register(require('@fastify/cors'), { origin: '*' });

fastify.get('/api/menu', async () => {
  return prisma.menuItem.findMany();
});

fastify.post('/api/contact', async (request) => {
  const { name, email, message } = request.body;
  return prisma.contact.create({ data: { name, email, message } });
});

async function seed() {
  await prisma.menuItem.createMany({
    data: [
      { name: 'Stellar Latte', description: 'A cosmic blend of espresso and milk', price: 4.99 },
      { name: 'Galactic Pastry', description: 'Flaky croissant with stardust glaze', price: 3.50 },
      { name: 'Nebula Smoothie', description: 'Berry blast with a cosmic twist', price: 5.99 },
    ],
  });
}

fastify.listen({ port: 3001 }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await seed();
  console.log('Server running on http://localhost:3001');
});