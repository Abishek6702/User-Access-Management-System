/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitialMigration1747885471061 {
    name = 'InitialMigration1747885471061'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "software" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "accessLevels" text NOT NULL, CONSTRAINT "PK_3ceec82cc90b32643b07e8d9841" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "accessType" character varying NOT NULL, "reason" text NOT NULL, "status" character varying NOT NULL DEFAULT 'Pending', "userId" integer, "softwareId" integer, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_699528c9bcfe16dbb8e3ddd39d2" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_699528c9bcfe16dbb8e3ddd39d2"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_be846ad4b43f40acc7034ef7f40"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TABLE "software"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
