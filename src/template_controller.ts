import {app} from "../app";
import {Component, BuiltComponent} from "./component";
import {TemplateIcon} from "../public/template_icon";

interface Template {

    name: string,
    fields: Array<any>,
    tags: Array<any>

}

interface TemplateState {

    id: number,

}

class TemplateController {

    static template: TemplateState;
    static templates: Array<Template> = [];

    static idGenerator = TemplateController.getID();

    static createTemplate(_template?: Template) {

        // set to an empty template if one isn't provided
        const templateInst: Template = _template ? _template : {
            name: "New Template", 
            fields: [], 
            tags: []
        };
        
        const templateDiv = Component.find("template-div");

        const state: TemplateState = {id: (this.idGenerator.next().value as number)};

        TemplateController.templates[state.id] = templateInst;
        const template: Component = (app.topbar.render(new TemplateIcon(), templateDiv, state) as Component);
        template.component.innerText = templateInst.name;

        template.state = state;
        template.component.id = `template-icon-${state.id}`;

    }

    static getCurrentTemplate(): Template {

        return this.templates[(this.template as TemplateState).id];

    } 

    static* getID() {

        let totalIDs = 0;

        while(true) {

            yield totalIDs;
            totalIDs++;

        }

    };

}

export {TemplateController, Template, TemplateState};