export interface Message {
  type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';
  text: string;
  system?: boolean;
}
