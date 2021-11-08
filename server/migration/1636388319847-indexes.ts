import { MigrationInterface, QueryRunner } from 'typeorm';

export class indexes1636388319847 implements MigrationInterface {
  name = 'indexes1636388319847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "program" RENAME COLUMN "narrativeAnswersTemplate" TO "narrativeReportTemplate"`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "programId" uuid, "questionId" uuid, "userId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9e998bb9cd097ddf5540019cba" ON "comment" ("created") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_55ade8204c8725b0fcbf58015c" ON "comment" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3a8d31adc085da908979362f0c" ON "option_choice" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f7b9c5af6381137e7989ba494b" ON "section" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01e042e771efbab1099a425cb1" ON "sub_section" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5904a9d40152f354e4c7b0202f" ON "user" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7d956cde9e2799a27d39d5eeeb" ON "program_user_assignment" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b75bbaf658084db81cd26f4c75" ON "program" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ebecfb4d43046aa9d1b5d38f0" ON "tag" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e52e5b9e4c807e978bf0ab6247" ON "question" ("updated") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c59ee2d2cd9c257ad87f330f96" ON "question" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_91578dceeb42466b9285f29e4b" ON "question" ("type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c60b58729b64dfbe41ca5d1c56" ON "answer" ("updated") `,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_b4470bd83e8cf8a697761c9c974" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_38c7b71e5d494309af3cb8a7d70" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_38c7b71e5d494309af3cb8a7d70"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_b4470bd83e8cf8a697761c9c974"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c60b58729b64dfbe41ca5d1c56"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_91578dceeb42466b9285f29e4b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c59ee2d2cd9c257ad87f330f96"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e52e5b9e4c807e978bf0ab6247"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ebecfb4d43046aa9d1b5d38f0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b75bbaf658084db81cd26f4c75"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7d956cde9e2799a27d39d5eeeb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5904a9d40152f354e4c7b0202f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01e042e771efbab1099a425cb1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f7b9c5af6381137e7989ba494b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3a8d31adc085da908979362f0c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_55ade8204c8725b0fcbf58015c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9e998bb9cd097ddf5540019cba"`,
    );
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(
      `ALTER TABLE "program" RENAME COLUMN "narrativeReportTemplate" TO "narrativeAnswersTemplate"`,
    );
  }
}
