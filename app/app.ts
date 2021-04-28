
import {Component} from "./src/component";
import {TopBar, SideBar, Workspace} from "./public/layout/layout.index";

class App extends Component {

    topbar: Component;
    sidebar: Component;
    workspace: Component;

    constructor() {

        super();

        this.topbar = (this.render(new TopBar()) as Component);
        this.sidebar = (this.render(new SideBar()) as Component);
        this.workspace = (this.render(new Workspace()) as Component);

    }

}

const appDiv = document.getElementById("app");
const app: App = (Component.load(new App(), (appDiv as HTMLElement)) as App);

export {app};