import {Component, Event} from "../src/component";
import {TemplateController} from "../src/template_controller";
import {TemplateWorkspace} from "./workspaces/template_workspace";
import {app} from "../app";

class TemplateIcon extends Component {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`<button class='template-icon'></button>`).raw()
        );

        this.domEvent("click", () => this.clickIcon());

    }

    private updateName() {

        this.component.innerText = this.state.name;

    }

    private clickIcon() {

        const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("current-icon");
        for (let element of elements) element.className = "template-icon";

        this.component.className += " current-icon";
        
        TemplateController.setCurrentTemplate(this.state);

        app.workspace.clear();
        app.render(new TemplateWorkspace(), app.workspace, this.state);

        this.addListener(Event.StateChange, () => this.updateName());

    }

}

export {TemplateIcon};