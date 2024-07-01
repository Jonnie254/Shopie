import mssql, { pool } from 'mssql'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import lodash from 'lodash'
import { UserDetails } from '../models/user.interface'
import { sqlconfig } from '../config/sql.config'


export class userService{

    async registerUser(user: UserDetails){
        let pool = await mssql.connect(sqlconfig)
        

        let user_id = v4()
        let hashedPassword =  bcrypt.hashSync(user.password, 6)
        console.log(hashedPassword)

        let emailExist = (await pool.query(`SELECT * FROM Users WHERE email = '${user.email}'`)).recordset
        console.log(emailExist[0])
        if(!lodash.isEmpty(emailExist)){
            return{
                error: "Email already exists"
            }
        }

        let result = (await pool.request().input('user_id', user_id).input('username', mssql.VarChar, user.username).input('email', mssql.VarChar, user.email).input('password', mssql.VarChar, hashedPassword).execute('registerUser')).rowsAffected


    if(result[0] == 1){
        return{
            message: "User registered successfully",
            user_id
        }
    }else{
        return{
            error: "User not registered"
        }
    }
    }
}