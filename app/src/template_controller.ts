import {app} from "../app";
import {Component, BuiltComponent} from "./component";
import {TemplateIcon} from "../public/template_icon";

/**
 * Defines the shape of Template data.
 */
interface Template {

    name: string,
    fields: Array<any>,
    tags: Array<any>

}

/**
 * Defines the shape of the state passed to the template icon component.
 */
interface TemplateState {

    id: number,

}

class TemplateController {

    static template: TemplateState;
    static templates: Array<Template> = [];

    static idGenerator = TemplateController.getID();

    /**
     * Creates a new template and renders a new icon for it.
     * 
     * @param _template : An object containing data to set as the initial data for the template.
     */
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

    /**
     * Get the current template opened in the workspace.
     * 
     * @returns The object containing the template's data.
     */
    static getCurrentTemplate(): Template {

        return this.templates[(this.template as TemplateState).id];

    } 

    /**
     * A Generator to create ids for each template.
     */
    static* getID() {

        let totalIDs = 0;

        while(true) {

            yield totalIDs;
            totalIDs++;

        }

    };

}

export {TemplateController, Template, TemplateState};