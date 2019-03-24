import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  selectAllProjects,
  Customer,
  Project,
  ProjectsService,
  NotificationsService,
  CustomersService,
  ProjectsState,
  AddProject,
  UpdateProject,
  DeleteProject,
  LoadProjects,
  initialProjects
} from '@workshop/core-data';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService
  ) {
    this.projects$ = this.store.pipe(select(selectAllProjects));
  }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all(); // for now

    this.store.dispatch(new LoadProjects(initialProjects));
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
    this.store.dispatch(new AddProject(project));

    // these will go away
    this.ns.emit('Project created!');
    // we don't need to rehydrate again for each operation.
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project)); // concrete action instance

    // these will go away
    this.ns.emit('Project saved!');
  }

  deleteProject(project) {
    // WE WANT TO MOVE AWAY FROM THESE GENERIC OBJECT LITERALS { TYPE:..., PAYLOAD:.... }

    // because we are using the entity to delete it we need to send the id.
    this.store.dispatch(new DeleteProject(project.id));

    // these will go away
    this.ns.emit('Project deleted!');
  }
}
