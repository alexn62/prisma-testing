import { prisma } from '../script';

describe('Prisma Tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });
  afterAll(async () => {
    await prisma.$disconnect();
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
});
