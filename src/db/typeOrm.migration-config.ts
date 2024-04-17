/* eslint-disable prettier/prettier */
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from './entities/user.entity';


config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [TaskEntity, UserEntity], // Entidades a serem usadas
    migrations: [__dirname + '/migrations/*.ts'], // Caminho para os arquivos de migração
    synchronize: false // Define se as entidades devem ser sincronizadas automaticamente
}
// Cria a fonte de dados com as opções especificadas
export default new DataSource(dataSourceOptions);

