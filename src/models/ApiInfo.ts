import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ApiInfo {

  @Expose()
  public name: string;

  @Expose()
  public version: string;

}
