
enum Event {

    Render,
    Load,
    Clear,
    Remove,
    StateChange,

}

interface Listener {

    event: UserEvent,
    callback: Function,

}

type ParentComponent = Component | undefined;
type UserEvent = Event | string;
type BuiltComponent = Component | Array<Component>;

class Component {

    component: HTMLElement;
    private stateStore: any;
    oldState: any;
    private listeners: Array<Listener>;

    constructor(_comp?: HTMLElement, _state?: any) {

        this.component = _comp ?? document.createElement("div");

        this.stateStore = _state ?? {};
        this.oldState = {};
        this.listeners = [];

    }

    render(_component: BuiltComponent, _parent?: ParentComponent, _state?: any) : BuiltComponent {

        if (!Array.isArray(_component)) return this.buildComponent(_component, _parent, _state);

        let componentList = [];
        for (let component of _component) componentList.push(this.buildComponent(component, _parent, _state));

        return componentList;
        
    }

    private buildComponent(_component: Component, _parent: ParentComponent = undefined, _state: any = null) : Component {

        if (_state != null) _component.state = _state;

        const innerComponent: HTMLElement = _component.component;
        (innerComponent as any).__outerComponent = _component;
        
        if (_parent) _parent.component.append(_component.component);
        else this.component.append(_component.component);

        _component.broadcast(Event.Render);

        return _component;

    }

    insertBreak(_parent?: ParentComponent) {

        const lineBreak: HTMLBRElement = document.createElement("br");

        if (_parent) _parent.component.append(lineBreak);
        else this.component.append(lineBreak);

    } 

    clear() {

        this.broadcast(Event.Clear);
        this.component.innerHTML = "";

    }

    remove() {
        
        this.broadcast(Event.Remove);
        this.component.remove();
    
    }

    raw(): HTMLElement { return this.component; }

    addListener(_event: UserEvent, _callback: Function) {

        this.listeners.push({
            event: _event,
            callback: _callback,
        });

    }

    broadcast(_event: UserEvent) {

        for (let listener of this.listeners) {
            
            if (listener.event == _event) listener.callback();

        }

    }

    get state(): any { return this.stateStore; }
    set state(_state: any) {

        this.oldState = this.stateStore;
        (this.component as any).state = _state;
        this.stateStore = _state;
        
        this.broadcast(Event.StateChange);

    }

    static load(_component: Component, _parent: HTMLElement, _clear: boolean = false): Component {

        if (_clear) _parent.innerHTML = "";
        _parent.append(_component.component);

        _component.broadcast(Event.Load);

        return _component;

    }

    static createFromHTML(_html: string, _noDiv: boolean = true) : Component {

        let element: HTMLElement = document.createElement("div");
        element.innerHTML = _html.trim();
        let finalElement: HTMLElement = element;
        if (_noDiv) (finalElement as any) = element.firstChild;

        const comp: Component = new Component(finalElement);
        return comp;

    }

    static find(_id: string): Component { 

        return (document.getElementById(_id) as any).__outerComponent;

    }

    static get empty(): Component { return new Component(); }

}

export {Component, Event, Listener, ParentComponent, UserEvent, BuiltComponent}