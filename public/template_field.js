
class TemplateField extends Component {

    constructor(_fieldComponent, _noLabel=false) {

        super();

        this.component.className = "template-field";

        const fieldLabel = Component.createFromHTML(/*html*/`
            <input class="field-label">
        `);

        fieldLabel.component.onchange = () => {

            TemplateController.getCurrentTemplate().fields[this.state.id].label = fieldLabel.component.value;

        }

        const fieldDelete = Component.createFromHTML(/*html*/`
            <button class="field-delete">X</button>
        `);

        fieldDelete.component.onclick = () => {

            TemplateController.getCurrentTemplate().fields.splice(this.state.id, 1);

            const fields = document.getElementsByClassName("template-field");

            for (let field of fields) if (field.state.id > this.state.id) field.state.id--;

            this.remove();

        }

        if (!_noLabel) this.render(fieldLabel);

        this.fieldComponent = _fieldComponent;

        this.insertBreak();
        this.render([_fieldComponent, fieldDelete]);

        this.addListener(Component.Events.Render, () => this.updateLabel(fieldLabel));

    }

    updateLabel(_fieldLabel) {

        _fieldLabel.component.value = TemplateController.getCurrentTemplate().fields[this.state.id].label;

    }

}