import {MigrationInterface, QueryRunner} from "typeorm";

export class createLog1612514478945 implements MigrationInterface {
    name = 'createLog1612514478945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_activity` (`id` varchar(36) NOT NULL, `userName` varchar(255) NOT NULL, `action` varchar(255) NOT NULL, `objectType` varchar(255) NOT NULL, `objectId` varchar(255) NULL, `metadata` json NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user_activity`");
    }

}
