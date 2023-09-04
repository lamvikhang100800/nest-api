import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne , CreateDateColumn , UpdateDateColumn } from 'typeorm';

@Entity('admin')
export class AdminEntity {
    @PrimaryGeneratedColumn('increment')
    id : number 

    @Column()
    name :string 

    @Column()
    email : string 

    @Column()
    password : string 

    @Column()
    roles : string 


    @CreateDateColumn({
        type: 'datetime',
        default: () => 'NOW()',
      })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'datetime',
        default: () => 'NOW()',
      })
    updatedAt: Date;

}