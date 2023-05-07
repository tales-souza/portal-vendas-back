import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { AddressEntity } from 'src/address/interfaces/address.entity';
import { StateEntity } from 'src/state/interfaces/state.entity';


@Entity({ name: 'city' })
export class CityEntity {

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'state_id', nullable: false })
    stateId: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => AddressEntity, (adress) => adress.city)
    addresses: AddressEntity[];

    @ManyToOne(() => StateEntity, (states) => states.cities)
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    state: StateEntity;





}

