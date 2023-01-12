import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 } from "uuid";

import { User } from "./User";

@Entity("user_tokens")
export class UserToken {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  expire_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor(id?: string) {
    if (!this.id) {
      this.id = v4();
    }
  }
}
