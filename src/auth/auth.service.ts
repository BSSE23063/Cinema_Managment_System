import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { BlacklistService } from 'src/blacklist/blacklist.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UsersService,
    private readonly roleService:RolesService,
    private readonly blacklistservice:BlacklistService,

    private jwtService: JwtService
  ) {}

    async validateUser(name: string, password: string) {
    console.log(`Validating User: name=${name}, password=${password}`);
    
    const user = await this.userService.FindByNameAndPassword(name,password);
    if(user){
      
      console.log(user.role);
    return { password: user.password, name: user.name, role:user.role ,id:user.id };
    // return user;
    }

    return null;
}

async login(user: any) {
  console.log(user.role);
    console.log('Login Called with User:', user);
    const payload = { name: user.name, password: user.password, role:user.role };
    const token = this.jwtService.sign(payload);
    console.log('Generated Token:', token);

    return  token;
}

async logout(token:string){
  console.log(token);
 
   const target= this.blacklistservice.create({token});
   console.log(target);
   console.log("Logout successfully");
  
}

}
