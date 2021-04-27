
class TemplateIcon extends Component {

    constructor() {

        super(
            Component.createFromHTML(/*html*/`<button class='template-icon'></button>`).raw()
        );

        this.component.onclick = () => {

            const elements = document.getElementsByClassName("current-icon");
            for (let element of elements) element.className = "template-icon";

            this.component.className += " current-icon";
            
            TemplateController.template = this.state;

            app.workspace.clear();
            app.render(TemplateWorkspace, app.workspace);

            Component.find("set-name").component.value = TemplateController.templates[this.state.id].name;

        }

    }

}