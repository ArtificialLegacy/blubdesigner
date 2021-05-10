
/**
 * Built in events broadcast by the Component class.
 */
enum Event {

    Render,
    Load,
    Clear,
    Remove,
    StateChange,

}

/**
 * Defines the shape of objects added to the listeners array.
 */
interface Listener {

    event: UserEvent,
    callback: Function,

}
interface CustomClass {

    name: string,
    value: string,

}

type ParentComponent = Component | undefined;
type UserEvent = Event | string;
type BuiltComponent = Component | Array<Component>;

class Component {

    component: HTMLElement;
    private stateStore: any;
    oldState: any;
    private listeners: Array<Listener>;
    private readonly keys: Object;
    private classList: Array<CustomClass>;

    /**
     * 
     * @param _comp - The HTMLElement to wrap in the component.
     * @param _state - The initial state data for the component.
     * @param _keys - The readonly keys for the component.
     */
    constructor(_comp?: HTMLElement, _state?: any, _keys?: Object) {

        this.component = _comp ?? document.createElement("div");

        this.stateStore = _state ?? {};
        this.oldState = {};
        this.listeners = [];

        this.classList = [];

        this.keys = Object.freeze(_keys ?? {});

    }

    static get empty(): Component { return new Component(); }

    /**
     * Render a component into another component.
     * 
     * @param _component - A component or list of components to render.
     * @param _parent - An optional parent component to render to.
     * @param _state - An initial state to set to the component as it is rendered.
     * @returns The component or list of components that were rendered.
     */
    render(_component: BuiltComponent, _parent?: ParentComponent, _state?: any): BuiltComponent {

        if (!Array.isArray(_component)) return this.buildComponent(_component, _parent, _state);

        let componentList = [];
        for (const component of _component) componentList.push(this.buildComponent(component, _parent, _state));

        return componentList;
        
    }

    /**
     * Internal method for building the components for rendering.
     * 
     * @param _component - A component to render.
     * @param _parent - An optional parent component to render to.
     * @param _state - An initial state to set to the component as it is rendered.
     * @returns The component that was rendered.
     */
    private buildComponent(_component: Component, _parent: ParentComponent = undefined, _state: any = null): Component {

        if (_state != null) _component.state = _state;

        const innerComponent: HTMLElement = _component.component;
        (innerComponent as any).__outerComponent = _component;

        _component.parseClasses();
        
        if (_parent) _parent.component.append(_component.component);
        else this.component.append(_component.component);

        _component.broadcast(Event.Render);

        return _component;

    }

    private parseClasses() {

        const classList: DOMTokenList = this.component.classList;

        const newClassList: Array<string> = [];

        classList.forEach((_class, _index) => {

            this.classList.forEach(_userClass => {

                if (_userClass.name == _class) {

                    newClassList.push(_userClass.value);
                    return;

                } else {

                    newClassList.push(_class);

                }

            });

        });

        if (newClassList.length > 0) this.component.className = newClassList.join(" ");

    }

    /**
     * Inserts a break element into a component's HTMLElement
     * 
     * @param _parent - The parent component to insert a break element to.
     */
    insertBreak(_parent?: ParentComponent) {

        const lineBreak: HTMLBRElement = document.createElement("br");

        if (_parent) _parent.component.append(lineBreak);
        else this.component.append(lineBreak);

    } 

    /**
     * Removes all child nodes from the component's HTMLElement
     */
    clear() {

        this.broadcast(Event.Clear);
        this.component.innerHTML = "";

    }

    /**
     * Removes the component's HTMLElement from it's parent and stops it from being rendered.
     */
    remove() {
        
        this.broadcast(Event.Remove);
        this.component.remove();
        this.component.innerHTML = "";
    
    }

    /**
     * Retrieves the HTMLElement from the component.
     *
     * @returns The HTMLElement wrapped in the component.
     */
    raw(): HTMLElement { return this.component; }

    /**
     * Adds an event listener to the component.
     * 
     * @param _event - The event to listen for.
     * @param _callback - A callback that will be called when the listened event is broadcast.
     */
    addListener(_event: UserEvent, _callback: Function) {

        this.listeners.push({
            event: _event,
            callback: _callback,
        });

    }

    /**
     * Broadcast an event to all listeners.
     * 
     * @param _event - The event to be broadcast.
     */
    broadcast(_event: UserEvent) {

        for (let listener of this.listeners) {
            
            if (listener.event == _event) listener.callback();

        }

    }

    domEvent(_event: string, _callback: Function) {

        this.component.addEventListener(_event, (_callback as any));

    }

    createClass(_name: string, _value: string) {

        this.classList.push({name: _name, value: _value});

    }

    get state(): any { return this.stateStore; }
    set state(_state: any) {

        this.oldState = this.stateStore;
        (this.component as any).state = _state;
        this.stateStore = _state;
        
        this.broadcast(Event.StateChange);

    }

    /**
     * Renders a component directly to an HTMLElement.
     * 
     * @param _component - The component to render.
     * @param _parent - The HTMLElement to append the component to.
     * @param _clear - If the parent element should be cleared first.
     * @returns The component appended to the HTMLElement
     */
    static load(_component: Component, _parent: HTMLElement, _clear: boolean = false): Component {

        if (_clear) _parent.innerHTML = "";
        _parent.append(_component.component);
        (_component.component as any).__outerComponent = _component;

        _component.broadcast(Event.Load);

        return _component;

    }

    /**
     * Create a component from HTML. Will append any HTMLElements that have a component attribute to the created component.
     * Will parse 'component="name"' and set it to this["name"]: Component
     * 
     * @param _html - The string to build the component from.
     * @param _noDiv - If the wrapper div should be removed, if true only the first node in the string will be added to the component. 
     * @returns The component containing the HTMLElement provided from the string.
     */
    static createFromHTML(_html: string, _noDiv: boolean = true): Component {

        let element: HTMLElement = document.createElement("div");
        element.innerHTML = _html.trim();

        let finalElement: HTMLElement = element;
        if (_noDiv) (finalElement as any) = element.firstChild;

        const comp: Component = new Component(finalElement);

        if (finalElement.hasAttribute("component")) {

            const compAttribute: string = finalElement.getAttribute("component") as string;
            (comp as any)[compAttribute] = new Component(finalElement);

        }

        for (const child of finalElement.getElementsByTagName("*")) {

            if (child.hasAttribute("component")) {

                const compAttribute: string = child.getAttribute("component") as string;
                (comp as any)[compAttribute] = new Component(child as HTMLElement);

            }

        }

        return comp;

    }

    /**
     * Return the component wrapped inside a rendered HTMLElement
     * 
     * @param _id - The id of the HTMLElement to find.
     * @returns The wrapped component.
     */
    static find(_id: string): Component { 

        return (document.getElementById(_id) as any).__outerComponent;

    }

}

export {Component, Event, Listener, ParentComponent, UserEvent, BuiltComponent}