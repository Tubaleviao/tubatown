import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { SignupDto } from 'src/dtos/signup.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const fakeAppService = {
      getUser: () => Promise.resolve({}),
      addUser: (user: SignupDto) => Promise.resolve(
        {id: 1, permission:1, email: 'a@a.com', password: 'a', date: 1, username: 'a'})
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{provide: AppService, useValue: fakeAppService}],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getUser('a')).toBeDefined();
    });
  });
});
