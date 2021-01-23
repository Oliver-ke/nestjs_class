import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // this is dependency injection in action
  // this is getting the app service
  // nestjs will create an instance of this call,
  // while passing in the required service (provider)
  constructor(private readonly appService: AppService) {}

  @Get('home')
  getHello(): string {
    return this.appService.getHello();
  }
}
