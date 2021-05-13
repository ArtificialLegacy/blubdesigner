import {Component, Event} from "../../src/component";
import {TemplateField} from "../template_field";
import {TemplateController} from "../../src/template_controller";

class LongTextField extends TemplateField<HTMLTextAreaElement> {

    constructor() {

        super(
            Component.createFromHTML<HTMLTextAreaElement>(/*html*/`
                <textarea class="long-text-field"></textarea>  
            `)
        );

        this.fieldComponent.domEvent("change", () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].text = this.fieldComponent.component.value;

        });

        this.addListener(Event.Render, () => this.updateText());

    }

    /**
     * Updates the text in the textarea with the stored text data.
     */
    private updateText() {

        this.fieldComponent.component.value = TemplateController.getCurrentTemplate().fields[this.state.id].text;

    }

}

export {LongTextField};