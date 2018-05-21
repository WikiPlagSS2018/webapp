import { Plagarism } from '../plagarism';

export class PlagResponse {
  tagged_input_text: string;
  plags: Plagarism[];
}
