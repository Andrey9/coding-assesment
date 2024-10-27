import { EventEmitter } from 'node:events';

export class EventBus extends EventEmitter {
  constructor() {
    super();
  }

  publish(event: string, data: any): void {
    this.emit(event, data);
  }

  subscribe(event: string, listener: (data: any) => void): void {
    this.on(event, listener);
  }
}
