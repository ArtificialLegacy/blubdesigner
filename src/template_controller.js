
class TemplateController {

    static template = undefined;
    static templates = [];

    static idGenerator = TemplateController.getID();

    static createTemplate(_template=false) {

        // set to an empty template if one isn't provided
        const templateInst = _template ? _template : {
            name: "New Template", 
            fields: [], 
            tags: []
        };
        
        const templateDiv = Component.find("template-div");

        const state = {id: this.idGenerator.next().value};

        TemplateController.templates[state.id] = templateInst;
        const template = app.topbar.render(TemplateIcon, templateDiv, state);
        template.component.innerText = templateInst.name;

        template.state = state;
        template.component.id = `template-icon-${state.id}`;

    }

    static getCurrentTemplate(_templateID) {

        return this.templates[this.template.id];

    } 

    static* getID() {

        let totalIDs = 0;

        while(true) {

            yield totalIDs;
            totalIDs++;

        }

    };

}