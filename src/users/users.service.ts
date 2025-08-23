import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, phoneNo, password, role_id } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

   
    const role = await this.rolesService.findOne(role_id);

    if(!role){
       throw new NotFoundException();
    }

     
     createUserDto.password=hashedPassword;
     createUserDto.role_id=role.id;
     
    
    const newUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({ relations: ['bookings', 'role'] });
  }

  async findOne(id: number){
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['bookings', 'role'],
    });
    if (!user){
       throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.role_id) {
      const role = await this.rolesService.findOne(updateUserDto.role_id);
      if(!role){
        throw new NotFoundException();
      }
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
  }

async FindByNameAndPassword(name:string,password:string){
  const user= await this.userRepository.findOne({where:{name:name},
  relations: ['role'],
  }
    
  );
  if (user){
    const pass= await bcrypt.compare(password,user.password);
    if(pass){
      return user;
    }
  }
  return null;
}

}
