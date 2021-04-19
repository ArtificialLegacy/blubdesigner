
class TemplateWorkspace extends Component {

    constructor() {

        super();

        const fieldDiv = Component.createFromHTML(/*html*/`<div class="template-field-div"></div>`);

        const setName = Component.createFromHTML(/*html*/`<input id="setName" class="set-name" value="New Template">`);
        setName.component.addEventListener("change", () => this.setNameChange(setName));

        const addField = Component.createFromHTML(/*html*/`
            <select class="add-field">
                <option value="none" selected>Add Field</option>
                <option value="short">Short Text</option>
                <option value="long">Long Text</option>
                <option value="dropdown">Drop Down</option>
                <option value="image">Image</option>
                <option value="description">Description</option>
            </select>
        `);

        addField.component.onchange = () => this.addFieldChange(addField, fieldDiv);

        const clone = Component.createFromHTML(/*html*/`<button class="template-clone">Clone</button>`);
        clone.component.onclick = () => { TemplateController.createTemplate(TemplateController.templates[TemplateController.template.id]); };

        const close = Component.createFromHTML(/*html*/`<button class="template-close">Close</button>`);
        close.component.onclick = () => {
            
            const elements = document.getElementsByClassName("current-icon");
            for (let element of elements) element.className = "template-icon";

            app.workspace.clear();

        }

        this.render([fieldDiv, setName, addField, clone, close]);

    }

    setNameChange(_setName) {

        Component.find(`templateIcon_${TemplateController.template.id}`).component.innerText = _setName.component.value;
        TemplateController.templates[TemplateController.template.id].name = _setName.component.value;

    }

    addFieldChange(_addField, _fieldDiv) {

        const addField = (_type) => {

            TemplateController.templates[TemplateController.template.id].fields.push({
                type: _type,
                text: "",
            });

        }

        switch (_addField.component.value) {

            case "short": {

                this.render(ShortTextField, _fieldDiv);
                addField("short");

                break;

            }

            case "long": {

                this.render(LongTextField, _fieldDiv);
                addField("long");

                break;

            }

            case "description": {

                this.render(DescriptionField, _fieldDiv);
                addField("description");

                break;

            }

        }

        _addField.component.value = "none";

    }

}