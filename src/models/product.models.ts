export class Product {
    id: number;
    product_name: string;
    image : string;
    price: number;
    describe: string;
    isActive: boolean;
    category_id : number;
    
  
    constructor({ id, 
        product_name ,
         image ,
          price,
          describe,
          isActive,
          category_id,

    }) {
        if (id !== undefined) this.id = id;
        if (product_name !== undefined) this.product_name = product_name;
        if (image !== undefined) this.image = image ;
        if (price !== undefined) this.price = price;
        if (describe !== undefined) this.describe = describe;
        if (isActive !== undefined) this.isActive = isActive;
        if (category_id !== undefined) this.category_id = category_id;
    }
  }
  