import { UserDatabase } from "../data/UserDatabase"
import { 
  CustomError, 
  InvalidEmail, 
  InvalidLogin, 
  InvalidPasswordSignup, 
  InvalidName, 
  InvalidPassword, 
  UserNotFound } from "../error/customError"

import {
  UserInputDTO,
  user,
  LoginInputDTO,
} from "../model/user"

import { IdGenerator } from "../services/IdGenerator"
import { TokenGenerator } from "../services/TokenGenerator"

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()
const userDatabase = new UserDatabase();

export class UserBusiness {
  public signup = async (input: UserInputDTO): Promise<string> => {
    try {
      const { name, email, password } = input

      if (!name || !email || !password) {
        throw new CustomError(
          400,
          'Preencha os campos "name", "email" e "password".'
        );
      }

      if (name.length < 4) {
        throw new InvalidName();
      }

      if (password.length <= 5) {
        throw new InvalidPasswordSignup();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const id: string = idGenerator.generateId()
      
      const user: user = {
        id,
        name,
        email,
        password,
      }
   
      await userDatabase.signup(user)
      const token = tokenGenerator.generateToken({id: user.id})

      return token
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public login = async (input: LoginInputDTO): Promise<string> => {
    try {
      const { email, password } = input
    
      if (!email || !password) {
        throw new InvalidLogin();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const user = await userDatabase.login(email);

      if (!user) {
        throw new UserNotFound();
      }

      if(password !== user.password){ 
        throw new InvalidPassword();
      }

      if(email !== user.email){ 
        throw new InvalidEmail();
      }

      const token = tokenGenerator.generateToken({id: user.id})
     
      return token
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }

  public getProfile = async(token:string)=>{
    try {

      const userDatabase = new UserDatabase()
      const user = await userDatabase.getProfile(token)
      
      return user

    } catch (err:any) {
      throw new Error(err.message);
    }
  }

  public profileSearch = async(token: string, id:string)=>{
    try {

      const userDatabase = new UserDatabase()
      const user = await userDatabase.profileSearch(id)
      
      return user

    } catch (err:any) {
      throw new Error(err.message);
    }
  }
}
