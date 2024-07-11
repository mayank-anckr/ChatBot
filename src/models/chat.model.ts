import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeInstance from "./index";

class Chat extends Model {
  public id!: number;
  public userId!: string;
  public messages!: JSON;
}

Chat.init(
  {
    userId: DataTypes.STRING,
    messages: DataTypes.JSON,
  },
  {
    sequelize: sequelizeInstance,
    modelName: "chat",
    tableName: "chat",
  }
);

export default Chat;
