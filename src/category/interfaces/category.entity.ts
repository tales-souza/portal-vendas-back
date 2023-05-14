import { ProductEntity } from '../../product/interfaces/product.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => ProductEntity, (products) => products.category)
    products?: ProductEntity[]
}

