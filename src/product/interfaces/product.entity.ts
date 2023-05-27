import { CategoryEntity } from '../../category/interfaces/category.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;
    
    @Column({ name: 'category_id', nullable: false })
    categoryId: number;

    @Column({ name: 'price', nullable: false })
    price: number;

    @Column({ name: 'image' })
    image: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category?: CategoryEntity
}



