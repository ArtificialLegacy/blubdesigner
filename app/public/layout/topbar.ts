import {Component} from "../../src/component";
import {TemplateController} from "../../src/template_controller";

class TopBar extends Component {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`<div class="topbar"></div>`).raw()
        );

        const createTemplate: Component = Component.createFromHTML(/*html*/`<button class="create-template">Create Template</button>`);
        
        const templateDiv: Component = Component.createFromHTML(/*html*/`<div id="template-div" class="template-div"></div>`);
        createTemplate.component.onclick = () => TemplateController.createTemplate();

        this.render([createTemplate, templateDiv]);

    }

}

export {TopBar};