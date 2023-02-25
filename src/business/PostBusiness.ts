import { TokenGenerator } from './../services/TokenGenerator'
import { PostDatabase } from './../data/PostDaabase'
import { post, PostInputDTO } from './../model/post'
import { IdGenerator } from './../services/IdGenerator'
import { CustomError } from './../error/customError'

const idGenerator = new IdGenerator()
const postDatabase = new PostDatabase()
const tokenGenerator = new TokenGenerator()

export class PostBusiness {
  public signup = async (token:string, input: PostInputDTO): Promise<string> => {
    try {
      const { userId, title, description } = input

      if (!userId || !title || !description) {
        throw new CustomError(
          400,
          'Preencha os campos "email", "password" e "userId".'
        );
      }

      const id: string = idGenerator.generateId()
      
      const post: post = {
        id,
        user_id: userId,
        title,
        description,
        create_dat: new Date()
      }
   
      await postDatabase.signup(post)
      const token = tokenGenerator.generateToken({id: post.id})

      return token
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}