import {Component, Event} from "../../src/component";
import {TemplateField} from "../template_field";
import {TemplateController} from "../../src/template_controller";

class DescriptionField extends TemplateField {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`
                <textarea class="long-text-field"></textarea>
            `), 
            true
        );

        this.fieldComponent.domEvent("change", () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].text = (this.fieldComponent.component as HTMLInputElement).value;

        });

        this.addListener(Event.Render, () => this.updateText());

    }

    /**
     * Updates the text in the textarea with the stored text data.
     */
    private updateText() {

        (this.fieldComponent.component as HTMLInputElement).value = TemplateController.getCurrentTemplate().fields[this.state.id].text;

    }

}

export {DescriptionField};