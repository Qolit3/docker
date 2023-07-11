import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository, UpdateResult } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExistsException } from 'src/exceptions-intreceptors/exceptions/user-already-exist-exception';


@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | HttpException> {
    const { password, ...user } = createUserDto

    const userCheck = await this.userRepository.findOneBy({
      email: user.email
    } || {
      username: user.username
    })

    if(userCheck) {
      return new UserAlreadyExistsException()
    }   
    
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt) 

    this.userRepository.create({
      password: hashPassword,
      ...user
    })

    return this.userRepository.save(user)
  }

  async auth(authUserDto: AuthUserDto): Promise<any> {
    let areEqual = false;

    const user = await this.userRepository.findOne({
      where: {
        email: authUserDto.email,
      }})

    if(user) {
      areEqual = await compare(authUserDto.password, user.password)

      if(areEqual) {
        const token = await this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' })
        return { access_token: token }
      }
    }

    return null
  }

  async validateFromYandex(yandexProfile) {
    const user = await this.userRepository.findOne({
      where: {
        email: yandexProfile.email
      }
    })

    if (!user) {
      return await this.create(yandexProfile);
    }
  
    return user;

  }

  async validatePassword(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username
      }
    }); 

    if(user && await compare(password, user.password)) {
      const { password, ...result } = user;
      return user
    }
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username
      }
    })

    if(user) {
      return user
    }

    return null
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<HttpException | UpdateResult> {
    const { password, ...user } = updateUserDto

    const userCheck = await this.userRepository.findBy({
      username: updateUserDto.username
    } || {
      email: updateUserDto.email
    } && {
      id: Not(id)
    })

    if(userCheck.length) {
      return new UserAlreadyExistsException()
    }   
    
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt) 

    return this.userRepository.update(id, {
      ...user,
      password: hashPassword
    })
  }

  async findMany(query: string) {
    return this.userRepository.find({
      where: {
        username: query
      } || {
        email: query
      }
    })
  }
}
