import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removesspace'
})
export class RemovesspacePipe implements PipeTransform {

  transform(value: any): unknown {

    // console.log(value)
    if (!value) {
      return '';
    }else{
      return value.replace(/\s+/g, '-').toLowerCase();
    }
   
  }

}
