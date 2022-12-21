import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity()
class Rental {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @ManyToMany(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(id?: string) {
    if (!this.id) {
      this.id = v4();
    } else {
      this.id = id;
    }
  }
}

export { Rental };
