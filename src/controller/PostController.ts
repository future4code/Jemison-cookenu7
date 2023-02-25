import { TokenGenerator } from './../services/TokenGenerator';
import { PostInputDTO } from '../model/post'
import { PostBusiness } from './../business/PostBusiness'
import { Request, Response } from "express"

export class PostController {

    public signup = async (req: Request, res: Response) => {
      try {
        const token = req.headers.authorization as string
        const { userId, title, description } = req.body
        
        const tokenGenerator = new TokenGenerator()
        const authenticationData = tokenGenerator.tokenData(token)
        
        const input: PostInputDTO = {
          userId,
          title,
          description
        }

        const postBusiness = new PostBusiness()
        const post = await postBusiness.signup(authenticationData as unknown as string, input)
  
        
        res.status(201).send({ message: "Post criado!", post })
      } catch (error: any) {
        res.status(400).send(error.message)
      }
    }
}