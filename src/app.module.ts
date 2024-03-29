import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsService } from './reports/reports.service';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'database_host', // e.g., 'localhost', 'example.com'
      // port: 5432, // your database port
      // username: 'database_username',
      // password: 'database_password',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true, // set to false in production
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ReportsService],
})
export class AppModule {}
