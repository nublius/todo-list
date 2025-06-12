import "./styles.css";

import { ProjectManager } from "./project-manager.js";

ProjectManager.addProject("yep", "true", "01/01/2002", "1");

console.log(ProjectManager.showProjects());
