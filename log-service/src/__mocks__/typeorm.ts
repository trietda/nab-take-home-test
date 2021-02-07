import * as typeorm from 'typeorm';

// @ts-ignore
typeorm.getConnection = jest.fn(() => ({
  createQueryRunner: jest.fn(() => ({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
  })),
}));

export = typeorm;
