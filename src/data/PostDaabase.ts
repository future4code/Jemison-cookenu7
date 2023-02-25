import { post } from './../model/post';
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
}