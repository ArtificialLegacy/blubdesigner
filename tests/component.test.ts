import {Component, Event} from "../app/src/component";

test("Create empty component.", () => {

    const emptyComponent: Component = new Component();

    expect(emptyComponent.component.tagName).toBe("DIV");
    expect(emptyComponent.state).toEqual({});
    expect(emptyComponent.oldState).toEqual({});

});

test("Get empty component.", () => {

    const emptyComponent: Component = Component.empty;

    expect(emptyComponent.component.tagName).toBe("DIV");
    expect(emptyComponent.state).toEqual({});
    expect(emptyComponent.oldState).toEqual({});

})

test("Create component.", () => {

    const component: Component = new Component(document.createElement("p"), {id: 5});

    expect(component.component.tagName).toBe("P");
    expect(component.state).toEqual({id: 5});
    expect(component.oldState).toEqual({});

});

test("Render component.", () => {

    const parentComponent: Component = Component.empty;
    const component: Component = Component.empty;

    const returnedComponent = parentComponent.render(component);

    expect(returnedComponent).toEqual(component);

});

test("Render a list of components.", () => {

    const parentComponent: Component = Component.empty;
    const component: Component = Component.empty;

    const returnedComponent = parentComponent.render([component, component]);

    expect(returnedComponent).toHaveLength(2);
    expect(returnedComponent).toEqual([component, component]);

});

test("Render event broadcast.", () => {

    const parentComponent: Component = Component.empty;
    const component: Component = Component.empty;
    let recieved: boolean = false;

    component.addListener(Event.Render, () => recieved = true);
    parentComponent.render(component);

    expect(recieved).toBe(true);

});

test("Insert break.", () => {

    const component: Component = Component.empty;

    component.insertBreak();

    expect(component.component.hasChildNodes()).toBe(true);

});

test("Clear component.", () => {

    const component: Component = Component.empty;
    component.component.innerHTML = "a";

    component.clear();

    expect(component.component.innerHTML).toBe("");

});

test("Clear event broadcast.", () => {

    const component: Component = Component.empty;
    let recieved: boolean = false;

    component.addListener(Event.Clear, () => recieved = true);
    component.clear();

    expect(recieved).toBe(true);

});

test("Remove component.", () => {

    const component: Component = Component.empty;

    component.remove();

    expect(component.component.innerHTML).toBe("");

});

test("Remove event broadcast.", () => {

    const component: Component = Component.empty;
    let recieved: boolean = false;

    component.addListener(Event.Remove, () => recieved = true);
    component.remove();

    expect(recieved).toBe(true);

});

test("Get raw element.", () => {

    const component: Component = Component.empty;

    const element: HTMLElement = component.raw();

    expect(element).toEqual(component.component);

});

test("Listen to event and broadcast it.", () => {

    const component: Component = Component.empty;
    let received: boolean = false;

    component.addListener("test", () => received = true);
    component.broadcast("test");

    expect(received).toBe(true);

});

test("Get state.", () => {

    const component: Component = Component.empty;

    expect(component.state).toEqual({});

});

test("Set state.", () => {

    const component: Component = Component.empty;

    component.state = {id: 5};

    expect(component.state).toEqual({id: 5});

});

test("Old state update.", () => {

    const component: Component = Component.empty;

    component.state = {id: 5};
    component.state = {};

    expect(component.oldState).toEqual({id: 5});

});

test("State change event broadcast.", () => {

    const component: Component = Component.empty;
    let received: boolean = false;

    component.addListener(Event.StateChange, () => received = true);
    component.state = {};

    expect(received).toBe(true);

});

test("Load component.", () => {

    const element: HTMLElement = document.createElement("div");
    const component: Component = Component.empty;

    Component.load(component, element);

    expect(element.innerHTML).toBe(component.component.outerHTML);

});

test("Load component and clear parent element.", () => {

    const element: HTMLElement = document.createElement("div");
    const component: Component = Component.empty;

    element.innerHTML = "a";

    Component.load(component, element, true);

    expect(element.innerHTML).toBe(component.component.outerHTML);

});

test("Create component from html.", () => {

    let element: string = /*html*/`<div></div>`;
    const component: Component = Component.createFromHTML(element);

    expect(component.component.outerHTML).toBe(element);

});

test("Create component with component attribute.", () => {

    let element: string = /*html*/`<div component="test"></div>`;
    const component: Component = Component.createFromHTML(element);

    expect((component as any).test.component.outerHTML).toBe(element);

});

test("Find component by element id.", () => {

    const component: Component = Component.empty;
    component.component.id = "test";

    Component.load(component, document.body);
    const foundComponent: Component = Component.find("test");

    expect(foundComponent).toEqual(component);

});