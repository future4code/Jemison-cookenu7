import { TokenGenerator } from './../services/TokenGenerator';
import { PostInputDTO } from '../model/post'
import { PostBusiness } from './../business/PostBusiness'
import { Request, Response } from "express"

const postBusiness = new PostBusiness()
const tokenGenerator = new TokenGenerator()

export class PostController {

  public signup = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string
      const { userId, title, description } = req.body

      const authenticationData = tokenGenerator.tokenData(token)
      
      const input: PostInputDTO = {
        userId,
        title,
        description
      }

      const post = await postBusiness.signup(authenticationData as unknown as string, input)

      
      res.status(201).send({ message: "Post criado!", post })
    } catch (error: any) {
      res.status(400).send(error.message)
    }
  }

  public postSearch = async(req:Request,res:Response)=>{
    try {

      const id = req.params.id
      const token = req.headers.authorization as string
  
      
      const authenticationData = tokenGenerator.tokenData(token)

      const post = await postBusiness.postSearch(authenticationData as unknown as string, id)
  
      res.status(200).send({
        id: post.id,
        title: post.title,
        description: post.description,
      })

    } catch (err:any) {
      res.status(400).send({
        message: err.message,
      })
    }
  }
}