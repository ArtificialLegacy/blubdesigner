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

        this.fieldComponent.component.onchange = () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].text = (this.fieldComponent.component as HTMLInputElement).value;

        }

        this.addListener(Event.Render, () => this.updateText());

    }

    updateText() {

        (this.fieldComponent.component as HTMLInputElement).value = TemplateController.getCurrentTemplate().fields[this.state.id].text;

    }

}

export {DescriptionField};