import EventEmitter from "events";

type TRAM_EMITERS = Map<string, EventEmitter>
const RAM_EMITTERS:TRAM_EMITERS = new Map();

const useEventEmitter = (namespace: string): EventEmitter => {
  const exist = RAM_EMITTERS.get(namespace);
  if (exist) return exist;
  else {
    const Emitter = new EventEmitter()
    RAM_EMITTERS.set(namespace, Emitter);
    return Emitter;
  }
}


export default useEventEmitter;
