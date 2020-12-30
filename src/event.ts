
export type EventHandler = (data: any) => void;

export class mEvent {
    private eventName: string = "";
    private handlers: EventHandler[] = [];
    constructor(eventName?: string) {
        this.eventName = eventName || "";
    }

    emit(data?: any) {
        if (!data) {
            data = {};
        }
        data.eventName = this.eventName;
        for (const handler of this.handlers) {
            handler(data);
        }
    }

    addEventListener(handler: EventHandler) {
        const exist = this.handlers.find(function(item) {
            return item === handler;
        });
        if (!exist) {
            this.handlers.push(handler)
        }
    }

    removeEventListener(handler: EventHandler) {
        const index = this.handlers.indexOf(handler);
        this.handlers.splice(index, 1);
    }

    removeAllListener() {
        this.handlers.length = 0;
    }
}