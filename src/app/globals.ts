export var server='';
export const version: string="1.0";
export const storage ='PagaleeScanner';

export function setServer(newValue: string) {
    server = newValue+'/api';
}