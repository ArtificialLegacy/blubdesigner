
class ShortTextField extends TemplateField {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`
                <input class="short-text-field">
            `)
        );

        this.fieldComponent.component.onchange = () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].text = this.fieldComponent.component.value;

        }

        this.addListener(Component.Events.Render, () => this.updateText());

    }

    updateText() {

        this.fieldComponent.component.value = TemplateController.getCurrentTemplate().fields[this.state.id].text;

    }

}