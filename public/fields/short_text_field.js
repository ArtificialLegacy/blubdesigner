
class ShortTextField extends TemplateField {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`
                <input class="short-text-field">  
            `)
        );

    }

}