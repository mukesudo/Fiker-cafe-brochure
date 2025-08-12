const fastify = require('fastify')({ logger: true });
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
require('dotenv').config()

fastify.register(require('@fastify/cors'), { 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';


const authenticate = async (request, reply) => {
  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return reply.status(401).send({ error: 'Invalid token' });
  }
};

fastify.post('/api/login', async (request, reply) => {
  const { username, password } = request.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ user: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return { token };
  }
  return reply.status(401).send({ error: 'Invalid credentials' });
});

fastify.get('/api/menu', async () => {
  return prisma.menuItem.findMany();
});

fastify.post('/api/menu', { preHandler: authenticate }, async (request, reply) => {
  const { name, description, price } = request.body;
  const newItem = await prisma.menuItem.create({ data: { name, description, price: parseFloat(price) } });
  return reply.status(201).send(newItem);
});

fastify.put('/api/menu/:id', { preHandler: authenticate }, async (request, reply) => {
  const { id } = request.params;
  const { name, description, price } = request.body;
  try {
    const updatedItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: { name, description, price: parseFloat(price) },
    });
    return reply.send(updatedItem);
  } catch (err) {
    return reply.status(404).send({ error: 'Menu item not found' });
  }
});

fastify.delete('/api/menu/:id', { preHandler: authenticate }, async (request, reply) => {
  const { id } = request.params;
  try {
    await prisma.menuItem.delete({ where: { id: parseInt(id) } });
    return reply.status(204).send();
  } catch (err) {
    return reply.status(404).send({ error: 'Menu item not found' });
  }
});

fastify.post('/api/contact', async (request, reply) => {
  try {
    const { name, email, message } = request.body;
    const contact = await prisma.contact.create({ data: { name, email, message } });
    return reply.status(201).send(contact);
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Failed to save contact' });
  }
});

async function seed() {
  await prisma.menuItem.deleteMany();
  await prisma.menuItem.createMany({
    data: [
      { name: 'Doro Wat', description: 'Traditional bone-in chicken stew slowly cooked in a rich, spicy berbere sauce served with a hard boiled egg', price: 18.00 },
      { name: 'Misir Wat', description: 'Spicy red lentil stew seasoned with berbere spice, served vegan', price: 14.00 },
      { name: 'Tibs', description: 'Pan-fried sliced beef or lamb with onions, peppers, and Ethiopian spices', price: 16.00 },
      { name: 'Injera', description: 'Sour fermented flatbread made from teff flour, served as a base for all dishes', price: 5.00 },
      { name: 'Shiro Wat', description: 'Chickpea stew cooked with onions, garlic, and berbere, vegan option', price: 13.00 },
      { name: 'Key Wat', description: 'Spicy beef stew with berbere and butter, Ethiopian classic', price: 15.00 },
      { name: 'Gomen be Siga', description: 'Collard greens cooked with meat, onions, and spices', price: 14.00 },
      { name: 'Fuul', description: 'Stewed and spiced fava beans, served with injera', price: 12.00 },
      { name: 'Salata', description: 'Fresh Ethiopian salad with tomatoes, onions, and peppers', price: 8.00 },
      { name: 'Chechebsa', description: 'Torn flatbread mixed with butter and spices, breakfast favorite', price: 10.00 },
      { name: 'Baked Tilapia', description: 'Whole tilapia baked with Ethiopian spices', price: 17.00 },
      { name: 'Rice Dish', description: 'Simple rice with spices for children or light meals', price: 9.00 },
    ],
  });
}

fastify.listen({ port: 3001, host: '0.0.0.0' }, async (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await seed();
  console.log('Server running on http://localhost:3001');
});