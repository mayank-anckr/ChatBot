import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeInstance from "./index";

class Chat extends Model {
  public id!: number;
  public userId!: string;
  public request!: string;
  public response!: string;
}

Chat.init(
  {
    userId: DataTypes.STRING,
    request: DataTypes.STRING,
    response: DataTypes.STRING,
  },
  {
    sequelize: sequelizeInstance,
    modelName: "chat",
    tableName: "chat",
  }
);

export default Chat;
