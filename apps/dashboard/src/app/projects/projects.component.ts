import { Component, OnInit } from '@angular/core';
import {
  Customer,
  CustomersService,
  NotificationsService,
  Project,
  ProjectsFacade
} from '@workshop/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;

  constructor(
    private customerService: CustomersService,
    private facade: ProjectsFacade,
    private ns: NotificationsService
  ) {
    this.projects$ = this.facade.projects$;
    this.currentProject$ = this.facade.currentProject$;
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    // this.currentProject = emptyProject;
    // this.store.dispatch(new SelectProject(null));
    this.facade.selectProject({ id: null });
  }

  selectProject(project) {
    // this.currentProject = project;
    //  this.store.dispatch(new SelectProject(project.id));
    this.facade.selectProject(project);
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all(); // for now

    // this.store.dispatch(new LoadProjects());
    this.facade.getProjects();
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  //  every action now is being handled by the ngrx entity in the reducer .

  createProject(project) {
    // this.store.dispatch(new AddProject(project));
    this.facade.createProject(project);

    // these will go away
    this.ns.emit('Project created!');
    // we don't need to rehydrate again for each operation.
  }

  updateProject(project) {
    // this.store.dispatch(new UpdateProject(project)); // concrete action instance
    this.facade.updateProject(project);

    // these will go away
    this.ns.emit('Project saved!');
  }

  deleteProject(project) {
    // WE WANT TO MOVE AWAY FROM THESE GENERIC OBJECT LITERALS { TYPE:..., PAYLOAD:.... }

    // because we are using the entity to delete it we need to send the id.
    // this.store.dispatch(new DeleteProject(project));
    this.facade.deleteProject(project);

    // these will go away
    this.ns.emit('Project deleted!');
  }
}
