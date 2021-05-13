import {Component, Event} from "../../src/component";
import {TemplateField} from "../template_field";
import {TemplateController} from "../../src/template_controller";

class DropDownField extends TemplateField<HTMLSelectElement> {

    constructor() {

        super(
            Component.createFromHTML<HTMLSelectElement>(/*html*/`
                <select class="drop-down-field"></select>
            `)
        );

    }

}

export {DropDownField};