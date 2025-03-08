import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741413197871 implements MigrationInterface {
    name = 'Migration1741413197871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "figure" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "price" numeric NOT NULL, "imageUrl" character varying NOT NULL, CONSTRAINT "PK_9b7e19001257bb3db43958e59da" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "figure"`);
    }

}
