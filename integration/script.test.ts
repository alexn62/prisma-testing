import { prisma } from '../script';
import { app, server } from '../index';
import request from 'supertest';
import { Response } from 'express';
describe('Prisma Tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  it('adding 1 + 3 should return 3', () => {
    expect(1 + 2).toBe(3);
  });
  it('should not have any user in db', async () => {
    const totalUser = await prisma.user.findMany();
    expect(totalUser.length).toBe(0);
  });
  it('should match after the count', async () => {
    await prisma.user.create({ data: { email: 'test@test.com' } });
    const totalUser = await prisma.user.findMany();
    expect(totalUser.length).toBe(1);
  });
  describe('GET /users', () => {
    it('should be empty initially', (done) => {
      request(app)
        .get('/users')
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res) => {
          const users = res.body.users;
          expect(users).toEqual([]);
        })
        .then(done);
    });
    it('should respond to added user', (done) => {
      prisma.user.create({ data: { email: 'test@test.com' } }).then((_) => {
        request(app)
          .get('/users')
          .expect(201)
          .expect('Content-Type', /json/)
          .then((res) => {
            const users = res.body.users;
            expect(users.length).toEqual(1);
          })
          .then(done);
      });
    });
  });
});
