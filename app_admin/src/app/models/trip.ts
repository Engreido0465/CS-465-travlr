export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: number;
  start: Date | string;
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}
