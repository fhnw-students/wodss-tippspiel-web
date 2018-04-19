import { Expose } from 'class-transformer';
import { ApiInfo } from '@/models/APIInfo';

export class GuiInfo extends ApiInfo {

  @Expose()
  public description: string;

}
