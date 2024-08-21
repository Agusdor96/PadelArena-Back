import { Entity } from 'typeorm';
import {v4 as uuid} from 'uuid';


// @Entity({
//     name: 'tournament'
// })
export class Tournament {
  status: string;
  name:string;
}
