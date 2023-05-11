import { AddressEntity } from '../../address/interfaces/address.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';


@Entity({ name: 'user' })
export class UserEntity {

   @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;
    
    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'phone' })
    phone: string;

    @Column({ name: 'cpf' })
    cpf: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'type_user' })
    typeUser: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;


    @OneToMany(() => AddressEntity, (adress) => adress.user)
    addresses?: AddressEntity[]


  }
  