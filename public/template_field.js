
class TemplateField extends Component {

    constructor(_fieldComponent, _noLabel=false) {

        super();

        this.component.className = "template-field";

        const fieldLabel = Component.createFromHTML(/*html*/`
            <input class="field-label">
        `);

        const fieldDelete = Component.createFromHTML(/*html*/`
            <button class="field-delete">X</button>
        `);

        if (!_noLabel) this.render(fieldLabel);

        this.render([_fieldComponent, fieldDelete]);

    }

}