import { Expose } from 'class-transformer';
import { ApiInfo } from '@/models/ApiInfo';

export class GuiInfo extends ApiInfo {

  @Expose()
  public description: string;

}
