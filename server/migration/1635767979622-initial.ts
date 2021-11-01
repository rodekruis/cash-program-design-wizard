import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1635767979622 implements MigrationInterface {
  name = 'initial1635767979622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "option_choice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "label" character varying NOT NULL, "orderPriority" integer NOT NULL, "questionId" uuid, CONSTRAINT "PK_66c1fee45346760a1a25b4542e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ce64efc58cbfd0dce78df0685" ON "option_choice" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "label" character varying, "orderPriority" integer, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_519942d7d51546482f7607ab3a" ON "section" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "orderPriority" integer, "sectionId" uuid, CONSTRAINT "PK_8bb7e1b5b1460df44eccc43e804" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bd8516699b715621ef77546c82" ON "sub_section" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1be4892b7ed0239bf108a537b9" ON "tag" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "label" character varying NOT NULL, "type" character varying, "orderPriority" integer NOT NULL, "subsectionId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_707fbd3b64444d030672b46f4a" ON "question" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "userName" character varying, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ce4c93ba419b56bd82e533724" ON "user" ("created") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_da5934070b5f2726ebfd3122c8" ON "user" ("userName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "program_user_assignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "role" character varying, "userId" uuid, "programId" uuid, CONSTRAINT "PK_d4f6f320419c3fcc3903b947386" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3231d80bef6e3208e4611acdba" ON "program_user_assignment" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "program" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "narrativeAnswersTemplate" character varying, CONSTRAINT "PK_3bade5945afbafefdd26a3a29fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bc351c7a1289829b04cb2b22b0" ON "program" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "programId" uuid, "questionId" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_679e99c15a830d72b9312dc707" ON "answer" ("created") `,
    );
    await queryRunner.query(
      `CREATE TABLE "question_tags_tag" ("questionId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_91ee6aab8dabacfdc162a45e5d4" PRIMARY KEY ("questionId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa1cf45c0ee075fd02b0009a0d" ON "question_tags_tag" ("questionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c92b89d6b96fe844dce95d4e4b" ON "question_tags_tag" ("tagId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "option_choice" ADD CONSTRAINT "FK_7fbfbe347eab044f390c35e7c9a" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_section" ADD CONSTRAINT "FK_1f62dcb7aebb6eefb3ea98075b7" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_fe8b24bd7036be6c951c19151fe" FOREIGN KEY ("subsectionId") REFERENCES "sub_section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_user_assignment" ADD CONSTRAINT "FK_50635185d3cf5b92149364d13f9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_user_assignment" ADD CONSTRAINT "FK_ed56c06c8b1d8082a82aa50a41f" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_9c9c85a5a443ebeca6c3d1d4dfb" FOREIGN KEY ("programId") REFERENCES "program"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_tags_tag" ADD CONSTRAINT "FK_fa1cf45c0ee075fd02b0009a0d4" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_tags_tag" ADD CONSTRAINT "FK_c92b89d6b96fe844dce95d4e4bd" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_tags_tag" DROP CONSTRAINT "FK_c92b89d6b96fe844dce95d4e4bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_tags_tag" DROP CONSTRAINT "FK_fa1cf45c0ee075fd02b0009a0d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_9c9c85a5a443ebeca6c3d1d4dfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_user_assignment" DROP CONSTRAINT "FK_ed56c06c8b1d8082a82aa50a41f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "program_user_assignment" DROP CONSTRAINT "FK_50635185d3cf5b92149364d13f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_fe8b24bd7036be6c951c19151fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_section" DROP CONSTRAINT "FK_1f62dcb7aebb6eefb3ea98075b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "option_choice" DROP CONSTRAINT "FK_7fbfbe347eab044f390c35e7c9a"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_c92b89d6b96fe844dce95d4e4b"`);
    await queryRunner.query(`DROP INDEX "IDX_fa1cf45c0ee075fd02b0009a0d"`);
    await queryRunner.query(`DROP TABLE "question_tags_tag"`);
    await queryRunner.query(`DROP INDEX "IDX_679e99c15a830d72b9312dc707"`);
    await queryRunner.query(`DROP TABLE "answer"`);
    await queryRunner.query(`DROP INDEX "IDX_bc351c7a1289829b04cb2b22b0"`);
    await queryRunner.query(`DROP TABLE "program"`);
    await queryRunner.query(`DROP INDEX "IDX_3231d80bef6e3208e4611acdba"`);
    await queryRunner.query(`DROP TABLE "program_user_assignment"`);
    await queryRunner.query(`DROP INDEX "IDX_da5934070b5f2726ebfd3122c8"`);
    await queryRunner.query(`DROP INDEX "IDX_8ce4c93ba419b56bd82e533724"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "IDX_707fbd3b64444d030672b46f4a"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP INDEX "IDX_1be4892b7ed0239bf108a537b9"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP INDEX "IDX_bd8516699b715621ef77546c82"`);
    await queryRunner.query(`DROP TABLE "sub_section"`);
    await queryRunner.query(`DROP INDEX "IDX_519942d7d51546482f7607ab3a"`);
    await queryRunner.query(`DROP TABLE "section"`);
    await queryRunner.query(`DROP INDEX "IDX_5ce64efc58cbfd0dce78df0685"`);
    await queryRunner.query(`DROP TABLE "option_choice"`);
  }
}
