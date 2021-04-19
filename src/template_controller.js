
class TemplateController {

    static template = undefined;
    static templates = [];

    static idGenerator = TemplateController.getID();

    static createTemplate(_template=null) {

        // set to an empty template if one isn't provided
        const templateInst = _template ?? false ? _template : {
            name: "New Template", 
            fields: [], 
            tags: []
        };
        
        const templateDiv = Component.find("templateDiv");

        const state = {id: this.idGenerator.next().value};

        TemplateController.templates[state.id] = templateInst;
        const template = app.topbar.render(TemplateIcon, templateDiv, state);
        template.component.innerText = templateInst.name;

        template.state = state;
        template.component.id = `templateIcon_${state.id}`;

    }

    static* getID() {

        let totalIDs = 0;

        while(true) {

            yield totalIDs;
            totalIDs++;

        }

    };

}