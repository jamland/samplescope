type EventName = string;
type RemoveListenerFn = () => void;
type OnEventFn = () => any;
interface IEvent {
  [key: string]: Array<OnEventFn>;
}

interface IEventEmitter {
  events: IEvent;
  on: (eventName: EventName, fn: OnEventFn) => RemoveListenerFn;
  emit: (eventName: EventName, data: any) => void;
}

// HOW TO USE :

// useEffect(() => {
//   const removeListener = ErrorEmitter.on('requestError', handleError);
//   return () => removeListener();
// }, []);

// const handleError = (error: CustomEvent) => {
//   console.log('error', error);
//   setState({ error });
// };

const EventEmitter: IEventEmitter = {
  events: {},
  on: function(eventName: EventName, fn: OnEventFn) {
    if (!this.events[eventName]) this.events[eventName] = [];

    this.events[eventName].push(fn);

    // way to unsubscribe to avoid memory leaks
    // let removelistener = emitter.on('event:name-changed', data => console.log(data));
    // removelistener();
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        eventFn => fn !== eventFn
      );
    };
  },
  emit: function(eventName: EventName, data: any) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(fn => {
        // eslint-disable-next-line no-useless-call
        fn.call(null, data);
      });
    }
  },
};

export default EventEmitter;
