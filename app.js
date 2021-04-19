
class App extends Component {

    constructor() {

        super();

        this.topbar    = this.render(TopBar);
        this.sidebar   = this.render(SideBar);
        this.workspace = this.render(Workspace);

    }

}

const appDiv = document.getElementById("app");
const app = Component.load(App, appDiv);