import { post } from '../model/post';
import { CustomError } from "../error/customError"
import { BaseDatabase } from "./BaseDatabase"

export class PostDatabase extends BaseDatabase {
  public signup = async (post: post) => {
    try {

      await PostDatabase.connection
        .insert(post)
        .into("recipe_cookenu");

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public postSearch = async(id: string): Promise<any> => {
    const result = await PostDatabase.connection
      .select("*")
      .from("recipe_cookenu")
      .where({ id });
 
    return result[0]
  }
}