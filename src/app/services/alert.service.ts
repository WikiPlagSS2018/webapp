import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable()
export class AlertService {

  constructor() {
  }

  showAlert(title: string, text: string, icon: string): Promise<any> {
    const params: any = {
      title: title,
      text: text,
      icon: icon
    };

    return swal(params);
  }
}
