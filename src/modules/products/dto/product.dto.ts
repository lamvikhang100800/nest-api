import {MinLength , IsNotEmpty , IsBoolean, IsNumber, IsDate  } from "class-validator";

export class ProductDTO {

    @MinLength(5)
    @IsNotEmpty()
    product_name : string ;
    describe: string;
    image : string ;

    @IsNotEmpty()
    category_id : number ;
    price : number;
    isActive : boolean;


 
    

}