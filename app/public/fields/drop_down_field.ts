import {Component, Event} from "../../src/component";
import {TemplateField} from "../template_field";
import {TemplateController} from "../../src/template_controller";

class DropDownField extends TemplateField<HTMLSelectElement> {

    constructor() {

        super(
            Component.createFromHTML<HTMLSelectElement>(/*html*/`
                <select class="drop-down-field"></select>
            `),
            Component.createFromHTML(/*html*/`
                <div class="drop-down-tools">
                    <input class="drop-down-field-option-text">
                    <button class="drop-down-field-add">+</button>
                </div>
            `)
        );

    }

}

export {DropDownField};