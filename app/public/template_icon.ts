import {Component, ParentComponent} from "../src/component";
import {TemplateController} from "../src/template_controller";
import {TemplateWorkspace} from "./workspaces/template_workspace";
import {app} from "../app";

class TemplateIcon extends Component {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`<button class='template-icon'></button>`).raw()
        );

        this.component.onclick = () => {

            const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("current-icon");
            for (let element of elements) element.className = "template-icon";

            this.component.className += " current-icon";
            
            TemplateController.template = this.state;

            (app.workspace as Component).clear();
            app.render(new TemplateWorkspace(), (app.workspace as ParentComponent));

            (Component.find("set-name").component as HTMLInputElement).value = TemplateController.templates[this.state.id].name;

        }

    }

}

export {TemplateIcon};