import {Component, Event} from "../src/component";
import {TemplateController} from "../src/template_controller";

enum FieldType {

    Description,
    DropDown,
    Image,
    LongText,
    ShortText,

}

interface TemplateFieldData {

    type: FieldType,
    text: string,
    label: string,

}

class TemplateField extends Component {

    fieldComponent: Component;

    constructor(_fieldComponent: Component, _noLabel: boolean = false) {

        super();

        this.component.className = "template-field";

        const fieldLabel: Component = Component.createFromHTML(/*html*/`
            <input class="field-label">
        `);

        fieldLabel.component.onchange = () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].label = (fieldLabel.component as HTMLInputElement).value;

        }

        const fieldDelete: Component = Component.createFromHTML(/*html*/`
            <button class="field-delete">X</button>
        `);

        fieldDelete.component.onclick = () => {

            TemplateController.getCurrentTemplate().fields.splice(this.state.id, 1);

            const fields = document.getElementsByClassName("template-field");

            for (let field of fields) if ((field as any).state.id > this.state.id) (field as any).state.id--;

            this.remove();

        }

        if (!_noLabel) this.render(fieldLabel);

        this.fieldComponent = _fieldComponent;

        this.insertBreak();
        this.render([_fieldComponent, fieldDelete]);

        this.addListener(Event.Render, () => this.updateLabel(fieldLabel));

    }

    updateLabel(_fieldLabel: Component) {

        (_fieldLabel.component as HTMLInputElement).value = TemplateController.getCurrentTemplate().fields[this.state.id].label;

    }

}

export {TemplateField, FieldType, TemplateFieldData};