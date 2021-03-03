interface Events {
  [key: string]: Function[];
}

export class EventEmitter {
  public events: Events;
  public play: string = 'play';
  public toggleSidebar: string = 'toggleSidebar';
  public autoplay: string = 'autoplay';
  public playPause: string = 'playPause';
  public seekForward: string = 'seekForward';
  public seekRewind: string = 'seekRewind';

  constructor(events?: Events) {
    this.events = events || {};
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
    (this.events[name] || []).forEach((fn) => fn(...args));
  }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;
