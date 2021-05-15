import {Component, Event} from "../src/component";
import {TemplateController} from "../src/template_controller";

/**
 * 
 */
enum FieldType {

    None = "NONE",
    Description = "DESCRIPTION",
    DropDown = "DROPDOWN",
    Image = "IMAGE",
    LongText = "LONGTEXT",
    ShortText = "SHORTTEXT",

}

/**
 * Defines the shape of the template field data that gets stored.
 */
interface TemplateFieldData {

    type: FieldType,
    text: string,
    label: string,

}

class TemplateField<_type extends HTMLElement = HTMLElement> extends Component {

    public fieldComponent: Component<_type>;

    /**
     * 
     * @param _fieldComponent The component provided by the child class.
     * @param _noLabel If the component shouldn't render a label.
     */
    constructor(_fieldComponent: Component<_type>, _toolBar: Component<HTMLDivElement> = Component.div, _noLabel: boolean = false) {

        super();

        this.component.className = "template-field";

        const fieldLabel: Component<HTMLInputElement> = this.fieldLabel();
        const fieldDelete: Component = this.fieldDelete();

        if (!_noLabel) this.render(fieldLabel);

        this.fieldComponent = _fieldComponent;

        this.insertBreak();

        this.render(fieldDelete, _toolBar);
        this.render([this.fieldComponent, _toolBar]);

        this.addListener(Event.Render, () => this.updateLabel(fieldLabel));

    }

    /**
     * Updates the text in the input with the stored text data.
     */
    private updateLabel(_fieldLabel: Component<HTMLInputElement>) {

        _fieldLabel.component.value = TemplateController.getCurrentTemplate().fields[this.state.id].label;

    }

    private fieldLabel(): Component<HTMLInputElement> {

        const fieldLabel: Component<HTMLInputElement> = Component.createFromHTML<HTMLInputElement>(/*html*/`
            <input class="field-label">
        `);

        fieldLabel.domEvent("change", () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].label = fieldLabel.component.value;

        });

        return fieldLabel;

    }

    private fieldDelete(): Component {

        const fieldDelete: Component = Component.createFromHTML(/*html*/`
            <button class="field-delete">X</button>
        `);

        fieldDelete.domEvent("click", () => {

            TemplateController.getCurrentTemplate().fields.splice(this.state.id, 1);

            const fields = document.getElementsByClassName("template-field");

            for (let field of fields) if ((field as any).state.id > this.state.id) (field as any).state.id--;

            this.remove();

        });

        return fieldDelete;

    }

}

export {TemplateField, FieldType, TemplateFieldData};