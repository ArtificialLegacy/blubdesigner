import {Component} from "../../src/component";
import {TemplateController} from "../../src/template_controller";

class TopBar extends Component {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`<div class="topbar"></div>`).raw()
        );

        const html: any = Component.createFromHTML(/*html*/`

            <button component="createTemplate" class="create-template">Create Template</button>
            <div component="templateDiv" id="template-div" class="template-div"></div>

        `, false);

        const {createTemplate, templateDiv} = html;

        createTemplate.component.onclick = () => TemplateController.createTemplate();

        this.render([createTemplate, templateDiv]);

    }

}

export {TopBar};