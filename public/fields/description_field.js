
class DescriptionField extends TemplateField {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`
                <textarea class="long-text-field"></textarea>
            `), 
            true
        );

    }

}