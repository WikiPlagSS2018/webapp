import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'clickable'})
export class ClickablePipe implements PipeTransform {
  transform(value: string): string {
    return value == undefined ? value : value.replace(new RegExp('(<span class="input_plag")'), '<span class="input_plag" (click)="logID()")');
  }

}
