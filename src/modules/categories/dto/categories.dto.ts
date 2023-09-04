import {MinLength , IsNotEmpty , IsBoolean  } from "class-validator";

export class CategoryDTO {

    @MinLength(5)
    @IsNotEmpty()
    Category_name : string ;
    describe: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean ;
}