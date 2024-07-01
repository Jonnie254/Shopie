import { Request, Response } from 'express';
import { userService } from '../services/user.service';

let UserService = new userService();

export class UserController {
    async registerUser(req: Request, res: Response){
        try{
            let{ username, email, password} = req.body

            console.log(req.body)

            let result = await UserService.registerUser(req.body)

            return res.status(201).json(result)
        }catch (error){
            return res.json({
                error
            })
        }
    }
}