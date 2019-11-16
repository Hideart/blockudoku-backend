import { TokenType } from '../enums/jwt';

export interface IJWTDecoded {
  id: string;
  type: TokenType;
  [key: string]: any;
}