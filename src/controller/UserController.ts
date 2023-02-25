import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { LoginInputDTO, UserInputDTO } from "../model/user"
import { TokenGenerator } from '../services/TokenGenerator'

const tokenGenerator = new TokenGenerator()
const userBusiness = new UserBusiness()

export class UserController {

  public signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body
   
      const input: UserInputDTO = {
        name,
        email,
        password
      }

      const token = await userBusiness.signup(input)
      
      res.status(201).send({ message: "Usuário criado!", token })
    } catch (error: any) {
      res.status(400).send(error.message)
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      const input: LoginInputDTO = {
        email,
        password,
      }

      const token = await userBusiness.login(input)
      
      res.status(200).send({ message: "Usuário logado!", token })
    } catch (error: any) {
      res.status(400).send(error.message)
    }
  }

  public getProfile = async(req:Request,res:Response)=>{
    try {
      const token = req.headers.authorization as string
  
      const authenticationData = tokenGenerator.tokenData(token)

      const user = await userBusiness.getProfile(authenticationData.id)
  
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
      })

    } catch (err:any) {
      res.status(400).send({
        message: err.message,
      })
    }
  }

  public profileSearch = async(req:Request,res:Response)=>{
    try {
      const id = req.params.id
      const token = req.headers.authorization as string
  
      const authenticationData = tokenGenerator.tokenData(token)

      const user = await userBusiness.profileSearch(authenticationData as unknown as string, id)
  
      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
      })

    } catch (err:any) {
      res.status(400).send({
        message: err.message,
      })
    }
  }
}
