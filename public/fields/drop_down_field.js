
class DropDownField extends TemplateField {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`
                <select class="drop-down-field"></select>
            `)
        );

    }

}