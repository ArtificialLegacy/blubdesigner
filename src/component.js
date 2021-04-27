
class Component {

    constructor(_comp=document.createElement("div"), _state={}) {

        this.component = _comp;

        this.__state = _state;
        this.__listeners = [];

    }

    render(_component, _parent=undefined, _state) {

        if (!Array.isArray(_component)) return this.__buildComponent(_component, _parent, _state);

        let componentList = [];
        for (let component of _component) componentList.push(this.__buildComponent(component, _parent, _state));

        return componentList;
        
    }

    __buildComponent(_component, _parent=undefined, _state=null) {

        let comp;

        if (_component.prototype instanceof Component) comp = new _component();
        else if (_component.prototype instanceof HTMLElement) comp = new Component(_component);
        else comp = _component;

        if (_state != null) comp.state = _state;
        else comp.state = comp.state;

        comp.component.__outerComponent = comp;
        
        if (_parent) _parent.component.append(comp.component);
        else this.component.append(comp.component);

        comp.broadcast(Component.Events.Render);
        setTimeout(() => comp.broadcast(Component.Events.RenderFinish));

        return comp;

    }

    insertBreak(_parent=undefined) {

        const lineBreak = document.createElement("br");

        if (_parent) _parent.component.append(lineBreak);
        else this.component.append(lineBreak);

    } 

    clear() {

        this.broadcast(Component.Events.Clear);
        this.component.innerHTML = "";

    }

    remove() {
        
        this.broadcast(Component.Events.Remove);
        this.component.remove();
    
    }

    raw() { return this.component; }

    addListener(_event, _callback) {

        this.__listeners.push({
            event: _event,
            callback: _callback,
        });

    }

    broadcast(_event) {

        for (let listener of this.__listeners) {
            
            if (listener.event == _event) listener.callback();

        }

    }

    get state() { return this.__state; }
    set state(_state) {

        this.component.state = _state;
        this.__state = _state;
        this.broadcast(Component.Events.StateChange);

    }

    static load(_component, _parent, _clear=false) {

        const comp = new _component();
        if (_clear) _parent.innerHTML = "";
        _parent.append(comp.component);

        comp.broadcast(Component.Events.Load);
        setTimeout(() => comp.broadcast(Component.Events.LoadFinish));

        return comp;

    }

    static createFromHTML(_html, _noDiv=true) {

        let element = document.createElement("div");
        element.innerHTML = _html.trim();
        if (_noDiv) element = element.firstChild;

        const comp = new Component(element);
        return comp;

    }

    static find(_id) { return document.getElementById(_id).__outerComponent; }

    static get empty() { return new Component(); }

    static Events = Object.freeze({
        Render: "render",
        RenderFinish: "renderFinish",
        Load: "load",
        LoadFinish: "loadFinish",
        Clear: "clear",
        Remove: "remove",
        StateChange: "stateChange",
    });

}