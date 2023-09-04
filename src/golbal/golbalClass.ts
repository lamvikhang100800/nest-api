export class ResponseData<data>{
    data : data | data [] ;
    statusCode : number ;
    messager : string ;

    constructor (data: data | data[] , statusCode: number , messager: string){
        this.data = data ;
        this.statusCode = statusCode ;
        this.messager = messager;
    }
}