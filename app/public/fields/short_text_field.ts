import {Component, Event} from "../../src/component";
import {TemplateField} from "../template_field";
import {TemplateController} from "../../src/template_controller";

class ShortTextField extends TemplateField {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`
                <input class="short-text-field">
            `)
        );

        this.fieldComponent.component.onchange = () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].text = (this.fieldComponent.component as HTMLInputElement).value;

        }

        this.addListener(Event.Render, () => this.updateText());

    }

    /**
     * Updates the text in the input with the stored text data.
     */
    updateText() {

        (this.fieldComponent.component as HTMLInputElement).value = TemplateController.getCurrentTemplate().fields[this.state.id].text;

    }

}

export {ShortTextField};