import {app} from "../app";
import {Component, BuiltComponent} from "./component";
import {TemplateIcon} from "../public/template_icon";
import {TemplateFieldData} from "../public/template_field";
import {deepCopy} from "../src/util/object_deep_copy";

/**
 * Defines the shape of Template data.
 */
interface Template {

    name: string,
    fields: Array<TemplateFieldData>,
    tags: Array<any>

}

/**
 * Defines the shape of the state passed to the template icon component.
 */
interface TemplateState {

    id: number,
    name: string,

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
        const templateInst: Template = _template ? deepCopy(_template) as Template : {
            name: "New Template", 
            fields: [], 
            tags: []
        };

        const state: TemplateState = {id: this.idGenerator.next().value as number, name: "New Template"};

        TemplateController.templates[state.id] = templateInst;
        app.topbar.state = TemplateController.templates;

    }

    static deleteTemplate(_templateID: number) {

        

    }

    static setCurrentTemplate(_template: TemplateState) {

        this.template = {..._template};

    }

    /**
     * Get the current template opened in the workspace.
     * 
     * @returns The object containing the template's data.
     */
    static getCurrentTemplate(): Template {

        return this.templates[this.template.id];

    } 

    /**
     * A Generator to create ids for each template.
     */
    static* getID() {

        let totalIDs: number = 0;

        while(true) {

            yield totalIDs;
            totalIDs++;

        }

    };

}

export {TemplateController, Template, TemplateState};