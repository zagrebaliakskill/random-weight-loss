import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({default: 0})
    balance: number;

    @Column({default: 0})
    xp: number;

    @Column({nullable: true})
    daily_missions_updated_in: Date;

    @Column({nullable: true})
    missions: string;

    @Column({default: 1})
    token_version: number;

    @Column({default: 0})
    total_steps: number;

    @Column({default: 0})
    total_push_ups: number;

    @Column({default: 0})
    total_sit_ups: number;

    @Column({default: 0})
    total_plank: number;

    @Column({default: 0})
    total_press: number;
}

