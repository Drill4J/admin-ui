export interface Message {
  type: 'SUCCESS' | 'ERROR' | 'WARNING';
  text: string;
}
