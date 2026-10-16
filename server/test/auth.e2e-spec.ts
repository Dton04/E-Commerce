import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Auth & RBAC (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const testEmail = `test_${Date.now()}@example.com`;
  const testPassword = 'Password123!';
  let accessToken: string;
  let refreshToken: string;

  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    prisma = app.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    // Clean up test user
    try {
      await prisma.user.deleteMany({
        where: { email: testEmail },
      });
      await prisma.$disconnect();
    } catch {
      // ignore
    }
    await app.close();
  });

  it('1. POST /api/v1/auth/register -> should register new customer user', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        email: testEmail,
        password: testPassword,
        fullName: 'Test Customer',
      })
      .expect(201);

    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(testEmail);
    expect(res.body.user.roles).toContain('CUSTOMER');
    expect(res.body).toHaveProperty('tokens');
    expect(res.body.tokens).toHaveProperty('accessToken');
    expect(res.body.tokens).toHaveProperty('refreshToken');

    accessToken = res.body.tokens.accessToken;
    refreshToken = res.body.tokens.refreshToken;
  });

  it('2. POST /api/v1/auth/register -> should return 409 when registering duplicate email', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        email: testEmail,
        password: testPassword,
        fullName: 'Duplicate User',
      })
      .expect(409);
  });

  it('3. POST /api/v1/auth/register -> should return 400 when validation fails', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        email: 'invalid-email',
        password: '123', // < 6 chars
      })
      .expect(400);
  });

  it('4. POST /api/v1/auth/login -> should login successfully with valid credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: testPassword,
      })
      .expect(200);

    expect(res.body.tokens).toHaveProperty('accessToken');
    expect(res.body.tokens).toHaveProperty('refreshToken');
    accessToken = res.body.tokens.accessToken;
    refreshToken = res.body.tokens.refreshToken;
  });

  it('5. POST /api/v1/auth/login -> should return 401 with wrong password', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: testEmail,
        password: 'wrongpassword',
      })
      .expect(401);
  });

  it('6. GET /api/v1/auth/me -> should return 401 without Bearer token', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .expect(401);
  });

  it('7. GET /api/v1/auth/me -> should return profile with valid Bearer token', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(res.body.email).toBe(testEmail);
    expect(res.body.roles).toContain('CUSTOMER');
  });

  it('8. GET /api/v1/auth/admin-test -> should return 403 Forbidden for regular customer', async () => {
    await request(app.getHttpServer())
      .get('/api/v1/auth/admin-test')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(403);
  });

  it('9. POST /api/v1/auth/refresh -> should rotate refresh token and issue new pair', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refreshToken })
      .expect(200);

    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.refreshToken).not.toBe(refreshToken);

    // Update tokens with the rotated ones
    accessToken = res.body.accessToken;
    const oldRefreshToken = refreshToken;
    refreshToken = res.body.refreshToken;

    // Trying to use oldRefreshToken again should fail (reuse detection)
    await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refreshToken: oldRefreshToken })
      .expect(401);
  });

  it('10. POST /api/v1/auth/logout -> should revoke refresh token', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    // Attempting to refresh after logout should fail
    await request(app.getHttpServer())
      .post('/api/v1/auth/refresh')
      .send({ refreshToken })
      .expect(401);
  });
});
