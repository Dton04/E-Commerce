import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsNotEmpty({ message: 'DATABASE_URL is required' })
  DATABASE_URL: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  PORT: number = 3000;

  @IsString()
  @IsNotEmpty({ message: 'JWT_ACCESS_SECRET is required' })
  @MinLength(32, {
    message:
      'JWT_ACCESS_SECRET must be at least 32 characters long for cryptographic security',
  })
  JWT_ACCESS_SECRET: string;

  @IsOptional()
  @IsString()
  JWT_ACCESS_EXPIRES_IN: string = '15m';

  @IsString()
  @IsNotEmpty({ message: 'JWT_REFRESH_SECRET is required' })
  @MinLength(32, {
    message:
      'JWT_REFRESH_SECRET must be at least 32 characters long for cryptographic security',
  })
  JWT_REFRESH_SECRET: string;

  @IsOptional()
  @IsString()
  JWT_REFRESH_EXPIRES_IN: string = '7d';
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .map((err) => Object.values(err.constraints ?? {}).join(', '))
      .join('; ');
    throw new Error(
      `[FATAL CONFIG ERROR] Environment validation failed at startup:\n- ${messages}\nApplication cannot start without secure configuration.`,
    );
  }
  return validatedConfig;
}
