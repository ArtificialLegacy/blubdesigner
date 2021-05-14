import {Component} from "../../src/component";
import {TemplateController} from "../../src/template_controller";
import {app} from "../../app";
import {DescriptionField, DropDownField, ImageField, LongTextField, ShortTextField} from "../fields/fields.index";
import {FieldType, TemplateFieldData} from "../template_field";

class TemplateWorkspace extends Component {

    constructor() {

        super();

        const html: Component = Component.createFromHTML(/*html*/`

            <div component="fieldDiv" class="template-field-div"></div>

            <input component="setName" id="set-name" class="set-name" value="New Template">
            
            <select component="addField" class="add-field">
                <option value="${FieldType.None}" selected>Add Field</option>
                <option value="${FieldType.ShortText}">Short Text</option>
                <option value="${FieldType.LongText}">Long Text</option>
                <option value="${FieldType.DropDown}">Drop Down</option>
                <option value="${FieldType.Image}">Image</option>
                <option value="${FieldType.Description}">Description</option>
            </select>

            <button component="deleteTemplate" class="template-delete">Delete</button>
            <button component="clone" class="template-clone">Clone</button>
            <button component="close" class="template-close">Close</button>

        `, false);

        const {fieldDiv, setName, addField, deleteTemplate, clone, close} = html as any;

        setName.domEvent("change", () => this.setNameChange(setName));
        setName.component.value = TemplateController.templates[TemplateController.template.id].name;

        addField.domEvent("change", () => this.addFieldChange(addField));

        deleteTemplate.domEvent("click", this.deleteTemplate);
        clone.domEvent("click", this.cloneTemplate);
        close.domEvent("click", this.closeTemplate);
    
        this.render([fieldDiv, setName, addField, deleteTemplate, clone, close]);

        this.addListener("fieldRender", () => this.renderFields(fieldDiv));
        this.broadcast("fieldRender");
        
    }

    /**
     * Renders all fields to the workspace.
     */
    private renderFields(_fieldDiv: Component) {

        _fieldDiv.clear();

        for (let f in TemplateController.getCurrentTemplate().fields) {

            const field: TemplateFieldData = TemplateController.getCurrentTemplate().fields[f];

            let fieldComponent: Component;

            switch (field.type) {

                case FieldType.ShortText: {

                    fieldComponent = new ShortTextField();
                    break;

                }

                case FieldType.LongText: {

                    fieldComponent = new LongTextField();
                    break;

                }

                case FieldType.DropDown: {

                    fieldComponent = new DropDownField();
                    break;

                }

                case FieldType.Description: {

                    fieldComponent = new DescriptionField();
                    break;

                }

                default: {

                    fieldComponent = new ShortTextField();

                }

            }

            this.renderField(fieldComponent, _fieldDiv, {id: f});

        }

    }

    /**
     * Updates the name of a template when the set name input element onchange event is triggered.
     * @param _setName The component that contains the set name input element.
     */
    private setNameChange(_setName: Component) {

        const iconComponent = Component.find(`template-icon-${TemplateController.template.id}`);
        const iconState = iconComponent.state;
        iconState.name = (_setName.component as HTMLInputElement).value;
        iconComponent.state = iconState;
        
        TemplateController.templates[TemplateController.template.id].name = (_setName.component as HTMLInputElement).value;

    }

    /**
     * Adds a new field to the current template when the add field drop down element onchange event is triggered.
     * @param _addField The component that contains the add field drop down element.
     */
    private addFieldChange(_addField: Component) {

        const fieldValue: FieldType = (_addField.component as HTMLSelectElement).value as FieldType;

        TemplateController.getCurrentTemplate().fields.push({
            type: fieldValue,
            text: "",
            label: "",
        });

        (_addField.component as HTMLSelectElement).value = `${FieldType.None}`;
        this.broadcast("fieldRender");

    }

    private cloneTemplate() {

        TemplateController.createTemplate(TemplateController.templates[TemplateController.template.id]);

    }

    private closeTemplate() {

        const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("current-icon");
        for (let element of elements) element.className = "template-icon";

        app.workspace.clear();

    }

    private deleteTemplate() {



    }

    /**
     * Renders a field to the field div.
     * @param _component The field component to render.
     * @param _fieldDiv The component that contains the field div.
     * @param _state The state to store in the rendered component and sets the rendered component's element id.
     */
    private renderField(_component: Component, _fieldDiv: Component, _state: any) {

        const field = (this.render(_component, _fieldDiv, _state) as Component);
        field.component.id = `template-field-${field.state.id}`;

    }

}

export {TemplateWorkspace};