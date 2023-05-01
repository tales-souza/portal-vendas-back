import { MigrationInterface, QueryRunner } from "typeorm"

export class AddUfState1682886114096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE state ADD uf varchar(2);`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE state DROP uf;`)
    }

}
