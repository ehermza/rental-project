import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCont'
})

export class FilterContPipe implements PipeTransform {

  transform(value: any, arg: any): any 
  {
    const result: any = [];
    // if (!arg.length) return result;
    
    for(const container of value) {
      const client:string = container.rented_by;
      const intro :string = arg.toLowerCase();
      if(client.toLowerCase().indexOf(intro)!= -1) {
        result.push(container);
      }
    }
    return result;
  }

}
