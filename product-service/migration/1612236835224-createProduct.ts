import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProduct1612236835224 implements MigrationInterface {
  name = 'createProduct1612236835224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `product` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `price` int NOT NULL, `brand` varchar(255) NULL, `color` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `product`');
  }
}
