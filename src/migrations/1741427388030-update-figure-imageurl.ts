import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFigureImageUrl1741427388030 implements MigrationInterface {
  name = 'UpdateFigureImageUrl1741427388030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "figure" DROP COLUMN "imageUrl"`);
    await queryRunner.query(`ALTER TABLE "figure" ADD "imageUrl" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "figure" DROP COLUMN "imageUrl"`);
    await queryRunner.query(
      `ALTER TABLE "figure" ADD "imageUrl" character varying NOT NULL`,
    );
  }
}
