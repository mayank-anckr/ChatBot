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
    request: DataTypes.TEXT,
    response: DataTypes.TEXT,
  },
  {
    sequelize: sequelizeInstance,
    modelName: "chat",
    tableName: "chat",
  }
);

export default Chat;
