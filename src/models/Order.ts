import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './User';
import { Product } from './Product';
import { ProductOrder } from './ProductOrder';

@Table({
  tableName: 'orders',
  createdAt: false,
  updatedAt: false,
})
export class Order extends Model {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
    id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    userId: number;

  @BelongsTo(() => User)
    user: User | null;

  @BelongsToMany(() => Product, () => ProductOrder)
    products: Product[];
}
