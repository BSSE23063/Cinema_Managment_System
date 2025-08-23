import { IsString } from "class-validator";

export class CreateBlacklistDto {

    @IsString()
    token:string
}
