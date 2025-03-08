import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741426841075 implements MigrationInterface {
    name = 'Migration1741426841075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "figure" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "figure" ADD "imageUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "figure" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "figure" ADD "imageUrl" character varying NOT NULL`);
    }

}
