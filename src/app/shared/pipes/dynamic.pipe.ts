import { DatePipe } from '@angular/common';
import { inject, Injector, Pipe, PipeTransform, Type } from '@angular/core';

const PIPES: { [key: string]: Type<PipeTransform> } = {
  date: DatePipe,
};

@Pipe({
  name: 'dynamic',
  standalone: true,
})
export class DynamicPipe implements PipeTransform {
  private injector = inject(Injector);

  transform(value: any, pipeName: string, pipeArgs: any[]): any {
    const pipe = this.injector.get(PIPES[pipeName]);
    return pipe.transform(value, ...pipeArgs);
  }
}
