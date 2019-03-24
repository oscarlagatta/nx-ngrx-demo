import { Action } from '@ngrx/store';
import { Project } from '../../projects/project.model';

// 01 Define our possible action types
export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',
  AddProject = '[Projects] Add Data',
  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data'
}

// 02 create our actions
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(private payload: Project) {}
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(private payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(private payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(private payload: Project) {}
}

// now we have defined these actionS we make them available
// by exporting a UNION TYPE
// 03 expose projects actions as union type
export type ProjectsActions =
  | SelectProject
  | AddProject
  | UpdateProject
  | DeleteProject;
