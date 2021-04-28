import {Component} from "../../src/component";
import {TemplateController} from "../../src/template_controller";
import {app} from "../../app";
import {DescriptionField, DropDownField, ImageField, LongTextField, ShortTextField} from "../fields/fields.index";
import {FieldType, TemplateFieldData} from "../template_field";

class TemplateWorkspace extends Component {

    constructor() {

        super();

        const fieldDiv: Component = Component.createFromHTML(/*html*/`<div class="template-field-div"></div>`);

        const setName: Component = Component.createFromHTML(/*html*/`<input id="set-name" class="set-name" value="New Template">`);
        setName.component.addEventListener("change", () => this.setNameChange(setName));

        const addField: Component = Component.createFromHTML(/*html*/`
            <select class="add-field">
                <option value="none" selected>Add Field</option>
                <option value="short">Short Text</option>
                <option value="long">Long Text</option>
                <option value="dropdown">Drop Down</option>
                <option value="image">Image</option>
                <option value="description">Description</option>
            </select>
        `);
        addField.component.onchange = () => this.addFieldChange(addField, fieldDiv);

        const clone: Component = Component.createFromHTML(/*html*/`<button class="template-clone">Clone</button>`);
        clone.component.onclick = () => { TemplateController.createTemplate(TemplateController.templates[TemplateController.template.id]); };

        const close: Component = Component.createFromHTML(/*html*/`<button class="template-close">Close</button>`);
        close.component.onclick = () => {
            
            const elements: HTMLCollectionOf<Element> = document.getElementsByClassName("current-icon");
            for (let element of elements) element.className = "template-icon";

            app.workspace.clear();

        }

        this.render([fieldDiv, setName, addField, clone, close]);

        for (let f in TemplateController.getCurrentTemplate().fields) {

            const field = TemplateController.getCurrentTemplate().fields[f];

            switch (field.type) {

                case FieldType.ShortText: {

                    this.renderField(new ShortTextField(), fieldDiv, {id: f});

                    break;

                }

                case FieldType.LongText: {

                    this.renderField(new LongTextField(), fieldDiv, {id: f});

                    break;

                }

                case FieldType.DropDown: {

                    this.renderField(new DropDownField(), fieldDiv, {id: f});

                    break;

                }

                case FieldType.Description: {

                    this.renderField(new DescriptionField(), fieldDiv, {id: f});

                    break;

                }

            }

        }
        
    }

    /**
     * Updates the name of a template when the set name input element onchange event is triggered.
     * @param _setName The component that contains the set name input element.
     */
    setNameChange(_setName: Component) {

        Component.find(`template-icon-${TemplateController.template.id}`).component.innerText = (_setName.component as HTMLInputElement).value;
        TemplateController.templates[TemplateController.template.id].name = (_setName.component as HTMLInputElement).value;

    }

    /**
     * Adds a new field to the current template when the add field drop down element onchange event is triggered.
     * @param _addField The component that contains the add field drop down element.
     * @param _fieldDiv The component that contains the field div element.
     */
    addFieldChange(_addField: Component, _fieldDiv: Component) {

        /**
         * Store the data for a new field and render it.
         * @param _type The type of field to add.
         * @param _component The field component to render.
         */
        const addField = (_type: FieldType, _component: Component) => {

            TemplateController.getCurrentTemplate().fields.push({
                type: _type,
                text: "",
                label: "",
            });

            this.renderField(_component, _fieldDiv, {id: TemplateController.getCurrentTemplate().fields.length - 1});

        }

        const fieldValue: string = (_addField.component as HTMLSelectElement).value;

        switch (fieldValue) {

            case "short": {

                addField(FieldType.ShortText, new ShortTextField());

                break;

            }

            case "long": {

                addField(FieldType.LongText, new LongTextField());

                break;

            }

            case "dropdown": {

                addField(FieldType.DropDown, new DropDownField());

                break;

            }

            case "description": {

                addField(FieldType.Description, new DescriptionField());

                break;

            }

        }

        (_addField.component as HTMLSelectElement).value = "none";

    }

    /**
     * Renders a field to the field div.
     * @param _component The field component to render.
     * @param _fieldDiv The component that contains the field div.
     * @param _state The state to store in the rendered component and sets the rendered component's element id.
     */
    renderField(_component: Component, _fieldDiv: Component, _state: any) {

        const field = (this.render(_component, _fieldDiv, _state) as Component);
        field.component.id = `template-field-${field.state.id}`;

    }

}

export {TemplateWorkspace};