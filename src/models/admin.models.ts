export class Admin {
    id : number ;
    name : string ;
    email : string ;
    password : string ;
    roles : string ;
    create_date : Date ;
    update_date : Date ;

    constructor(id, name, email, password,roles, create_date, update_date){
        if(id !== undefined ) this.id = id;
        if(name !== undefined) this.name = name;
        if(email !==undefined) this.email = email;
        if(password !== undefined) this.password = password;
        if(roles !== undefined) this.roles = roles;
        if(create_date !== undefined) this.create_date = create_date;
        if(update_date !== undefined) this.update_date = update_date;

    }

}