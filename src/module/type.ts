import { SerialAction } from './Serial/type';
import { LogAction } from './Log/type';

export type AppAction = SerialAction | LogAction;
