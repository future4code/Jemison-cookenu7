import { CustomError } from "../error/customError"
import { user } from "../model/user"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
  public login = async (email: string) => {
    try {
  
      const result = await UserDatabase.connection
        .select()
        .where({email})
        .from("cookenu");
      
      return result[0]
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public signup = async (user: user) => {
    try {

      await UserDatabase.connection
        .insert(user)
        .into("cookenu");

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public getProfile = async(id: string): Promise<any> => {
    const result = await UserDatabase.connection
      .select("*")
      .from("cookenu")
      .where({ id });
 
    return result[0]
  }
 
  public profileSearch = async(id: string): Promise<any> => {
    const result = await UserDatabase.connection
      .select("*")
      .from("cookenu")
      .where({ id });
 
    return result[0]
  }
}
