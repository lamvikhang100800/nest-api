import {MinLength , IsNotEmpty , IsBoolean  } from "class-validator";

export class registerDTO {

    @MinLength(5)
    @IsNotEmpty()
    name : string ;
    
    @MinLength(5)
    @IsNotEmpty()
    email: string ;

    @MinLength(5)
    @IsNotEmpty()
    password :string;
    

   
}