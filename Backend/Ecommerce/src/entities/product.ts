// Import required decorators and types from TypeORM
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Define Product as a database entity
@Entity()
export class Product {
  // Auto-generated primary key column
  @PrimaryGeneratedColumn()
  id!: number;

  // Product name stored as a string column
  @Column()
  name!: string;

  // Price stored as a decimal column type
  @Column("decimal")
  price!: number;

  // Product description stored as a string column
  @Column()
  description!: string;
  
  @Column()
  imageUrl!: string; // URL of the product image stored as a string column
}
