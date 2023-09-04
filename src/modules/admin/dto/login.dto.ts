import {MinLength , IsNotEmpty , IsBoolean  } from "class-validator";

export class loginDTO {
    
    @MinLength(5)
    @IsNotEmpty()
    email: string ;

    @MinLength(5)
    @IsNotEmpty()
    password :string;
    

   
}