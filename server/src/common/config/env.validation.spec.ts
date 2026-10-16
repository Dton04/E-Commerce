import 'reflect-metadata';
import { validateEnv } from './env.validation';

describe('Environment Configuration Validation (Fail-Fast)', () => {
  const validConfig = {
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/testdb',
    PORT: 3000,
    JWT_ACCESS_SECRET: 'super-secure-access-secret-key-32-chars-long',
    JWT_REFRESH_SECRET: 'super-secure-refresh-secret-key-32-chars-long',
    JWT_ACCESS_EXPIRES_IN: '15m',
    JWT_REFRESH_EXPIRES_IN: '7d',
  };

  it('should pass validation when all required secrets are >= 32 characters', () => {
    expect(() => validateEnv(validConfig)).not.toThrow();
  });

  it('should fail fast with Error if JWT_ACCESS_SECRET is missing', () => {
    const invalidConfig = { ...validConfig, JWT_ACCESS_SECRET: undefined };
    expect(() => validateEnv(invalidConfig)).toThrow(
      /JWT_ACCESS_SECRET must be at least 32 characters long/,
    );
  });

  it('should fail fast with Error if JWT_ACCESS_SECRET is shorter than 32 characters', () => {
    const weakConfig = { ...validConfig, JWT_ACCESS_SECRET: 'weak-secret-123' };
    expect(() => validateEnv(weakConfig)).toThrow(
      /JWT_ACCESS_SECRET must be at least 32 characters long/,
    );
  });

  it('should fail fast with Error if JWT_REFRESH_SECRET is missing', () => {
    const invalidConfig = { ...validConfig, JWT_REFRESH_SECRET: undefined };
    expect(() => validateEnv(invalidConfig)).toThrow(
      /JWT_REFRESH_SECRET must be at least 32 characters long/,
    );
  });

  it('should fail fast with Error if JWT_REFRESH_SECRET is shorter than 32 characters', () => {
    const weakConfig = { ...validConfig, JWT_REFRESH_SECRET: 'short-refresh' };
    expect(() => validateEnv(weakConfig)).toThrow(
      /JWT_REFRESH_SECRET must be at least 32 characters long/,
    );
  });

  it('should fail fast with Error if DATABASE_URL is missing', () => {
    const invalidConfig = { ...validConfig, DATABASE_URL: undefined };
    expect(() => validateEnv(invalidConfig)).toThrow(
      /DATABASE_URL is required/,
    );
  });
});
