
class TopBar extends Component {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`<div class="topbar"></div>`).raw()
        );

        const createTemplate = Component.createFromHTML(/*html*/`<button class="create-template">Create Template</button>`);

        const templateDiv = Component.createFromHTML(/*html*/`<div id="templateDiv" class="template-div"></div>`);

        createTemplate.component.onclick = () => TemplateController.createTemplate();

        this.render([createTemplate, templateDiv]);

    }

}