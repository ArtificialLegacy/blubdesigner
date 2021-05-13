import {Component, Event} from "../../src/component";
import {TemplateField} from "../template_field";
import {TemplateController} from "../../src/template_controller";

class ShortTextField extends TemplateField<HTMLInputElement> {

    constructor() {

        super(
            Component.createFromHTML<HTMLInputElement>(/*html*/`
                <input class="short-text-field">
            `)
        );

        this.fieldComponent.domEvent("change", () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].text = this.fieldComponent.component.value;

        });

        this.addListener(Event.Render, () => this.updateText());

    }

    /**
     * Updates the text in the input with the stored text data.
     */
    private updateText() {

        this.fieldComponent.component.value = TemplateController.getCurrentTemplate().fields[this.state.id].text;

    }

}

export {ShortTextField};