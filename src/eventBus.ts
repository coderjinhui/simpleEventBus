import { mEvent, EventHandler } from "./event";
export class EventBus {
    private events = new Map<string, mEvent>();
    private eventData: {[eventName: string]: any[]} = {};

    private static instance: EventBus;

    public static get Instance(): EventBus {
        return this.instance || (this.instance = new this());
    }

    private getEvent(eventName: string) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new mEvent(eventName));
        }
        const event = this.events.get(eventName);
        return event;
    }

    public emit(eventName: string, data?: any) {
        const event = this.getEvent(eventName);
        if (!this.eventData[eventName]) {
            this.eventData[eventName] = [];
        }
        this.eventData[eventName].push(data);
        event?.emit(data);
    }

    public on(eventName: string, handler: EventHandler) {
        const datas = this.eventData[eventName] || [];
        this.eventData[eventName] = [];
        const event = this.getEvent(eventName);
        event?.addEventListener(handler);
        for (const data of datas) {
            event?.emit(data);
        }
    }

    public removeEventListener(eventName: string, handler: EventHandler) {
        const event = this.getEvent(eventName);
        event?.removeEventListener(handler);
    }

    public removeAllListener(eventName: string) {
        const event = this.getEvent(eventName);
        event?.removeAllListener();
        this.eventData[eventName] = [];
    }
}