import {VideogameDTORespCompl} from './VideogameDTORespCompl';

export interface PGDTOResp
{
  id?:number;
  name:string;
  img:string;
  videogame:VideogameDTORespCompl;
  description:string;
}
