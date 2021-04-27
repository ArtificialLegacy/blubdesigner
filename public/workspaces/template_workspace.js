
class TemplateWorkspace extends Component {

    constructor() {

        super();

        const fieldDiv = Component.createFromHTML(/*html*/`<div class="template-field-div"></div>`);

        const setName = Component.createFromHTML(/*html*/`<input id="set-name" class="set-name" value="New Template">`);
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

        for (let f in TemplateController.getCurrentTemplate().fields) {

            const field = TemplateController.getCurrentTemplate().fields[f];

            switch (field.type) {

                case "short": {

                    this.renderField(ShortTextField, fieldDiv, {id: f});

                    break;

                }

                case "long": {

                    this.renderField(LongTextField, fieldDiv, {id: f});

                    break;

                }

                case "dropdown": {

                    this.renderField(DropDownField, fieldDiv, {id: f});

                    break;

                }

                case "description": {

                    this.renderField(DescriptionField, fieldDiv, {id: f});

                    break;

                }

            }

        }
        
    }

    setNameChange(_setName) {

        Component.find(`template-icon-${TemplateController.template.id}`).component.innerText = _setName.component.value;
        TemplateController.templates[TemplateController.template.id].name = _setName.component.value;

    }

    addFieldChange(_addField, _fieldDiv) {

        const addField = (_type, _component) => {

            TemplateController.getCurrentTemplate().fields.push({
                type: _type,
                text: "",
                label: "",
            });

            this.renderField(_component, _fieldDiv, {id: TemplateController.getCurrentTemplate().fields.length - 1});

        }

        switch (_addField.component.value) {

            case "short": {

                addField("short", ShortTextField);

                break;

            }

            case "long": {

                addField("long", LongTextField);

                break;

            }

            case "dropdown": {

                addField("dropdown", DropDownField);

                break;

            }

            case "description": {

                addField("description", DescriptionField);

                break;

            }

        }

        _addField.component.value = "none";

    }

    renderField(_component, _fieldDiv, _state) {

        const field = this.render(_component, _fieldDiv, _state);
        field.component.id = `template-field-${field.state.id}`;

    }

}