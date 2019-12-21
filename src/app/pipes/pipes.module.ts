import { NgModule } from '@angular/core';
import { FilroCompletadoPipe } from './filro-completado.pipe';




@NgModule({
  declarations: [FilroCompletadoPipe],
  exports: [FilroCompletadoPipe]
 
})
export class PipesModule { }
