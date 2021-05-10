import {Component, Event} from "../../src/component";
import {TemplateController} from "../../src/template_controller";
import {TemplateIcon} from "../template_icon";

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

        this.addListener(Event.StateChange, () => this.updateIcons(templateDiv));

    }

    private updateIcons(_templateDiv: Component) {

        _templateDiv.clear();

        for (const t in this.state) {

            const temp: number = t as unknown as number;

            const template = this.state[temp];
            const templateState = {id: temp};

            const templateIcon: Component = (this.render(new TemplateIcon(), _templateDiv, templateState) as Component);
            templateIcon.component.innerText = template.name;

            if (TemplateController.template?.id == templateState.id) templateIcon.component.className += " current-icon";

            templateIcon.state = templateState;
            templateIcon.component.id = `template-icon-${templateState.id}`;

        }

    }

}

export {TopBar};