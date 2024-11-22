import { DynamicModule, Module } from '@nestjs/common'
import { EnvironmentService } from './environment.service'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { join } from 'node:path'

@Module({
  imports: [ConfigModule],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule extends ConfigModule {
  static async forRoot(options: ConfigModuleOptions = {}): Promise<DynamicModule> {
    return await super.forRoot({
      ...options,
      envFilePath: [
        join(__dirname, `../../.env`), //.${process.env.NODE_ENV}
      ],
    })
  }
}
