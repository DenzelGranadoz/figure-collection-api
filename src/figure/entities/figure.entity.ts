import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Figure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;
}
