import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class MissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // Название миссии
    @Column()
    title: string;

    // Задача миссии
    @Column()
    mission_target: string;

    // Кол-во повторов или же шагов - идёт в статистику
    @Column()
    target_value: number;

    // Описание миссии
    @Column()
    description: string;

    // Кол-во XP которое получит пользователь за выполнение
    @Column()
    xp: number;

    // Кол-во калорий которые получит пользователь за выполнение
    @Column()
    balance: number;

    // Тип миссии plank | press | push-ups | sit-ups | run
    @Column()
    type: string;

    // Сложность миссии от 1 до 10
    @Column()
    difficulty: number;

}

