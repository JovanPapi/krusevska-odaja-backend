import { Model, Optional } from "sequelize";

export interface AdminAttributes {
  uuid: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export type AdminCreationAttributes = Optional<AdminAttributes, "uuid">;

export class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public uuid!: number;
  public firstName!: string;
  public lastName!: string;
  public username!: string;
  public password!: string;
}
