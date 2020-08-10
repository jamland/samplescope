interface Events {
  [key: string]: Function[];
}

export class EventPlayerEmitter {
  public events: Events;
  public play: string;

  constructor(events?: Events) {
    this.events = events || {};
    this.play = 'play';
  }

  public subscribe(name: string, cb: Function) {
    (this.events[name] || (this.events[name] = [])).push(cb);

    return {
      unsubscribe: () =>
        this.events[name] &&
        this.events[name].splice(this.events[name].indexOf(cb) >>> 0, 1),
    };
  }

  public emit(name: string, ...args: any[]): void {
    (this.events[name] || []).forEach(fn => fn(...args));
  }
}

const eventPlayerEmitter = new EventPlayerEmitter();

export default eventPlayerEmitter;
