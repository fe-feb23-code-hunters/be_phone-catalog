import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from './Product';
import { Order } from './Order';

@Table({
  tableName: 'product_orders',
  createdAt: false,
  updatedAt: false,
})
export class ProductOrder extends Model {
  @ForeignKey(() => Product)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    productId: string;

  @BelongsTo(() => Product)
    product: Product;

  @ForeignKey(() => Order)
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    orderId: string;

  @BelongsTo(() => Order)
    order: Order;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    count: number;
}
