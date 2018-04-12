import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class MetaData {

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public version: string;

}
