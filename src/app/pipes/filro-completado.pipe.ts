import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filroCompletado',
  pure: false
})
export class FilroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean= true): Lista[] {

    return listas.filter(lista => lista.terminada===completada);
    
  }

}
