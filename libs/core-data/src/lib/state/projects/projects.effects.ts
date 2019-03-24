import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../../projects/projects.service';
import {
  ProjectsActionTypes,
  LoadProjects,
  ProjectsLoaded,
  ProjectAdded,
  AddProject,
  UpdateProject,
  ProjectUpdated,
  DeleteProject,
  ProjectDeleted
} from './projects.actions';
import { switchMap, map } from 'rxjs/operators';
import { Project } from '../../projects/project.model';
import { DataPersistence } from '@nrwl/nx';
import { ProjectsState } from './projects.reducer';

@Injectable({ providedIn: 'root' })
export class ProjectsEffects {
  @Effect() loadProjects$ = this.dataPersistence.fetch(
    ProjectsActionTypes.LoadProjects,
    {
      run: (action: LoadProjects, state: ProjectsState) => {
        return this.projectsService
          .all()
          .pipe(map((res: Project[]) => new ProjectsLoaded(res)));
      },
      onError: (action: LoadProjects, error) => {
        console.log(`Error ${error}`);
      }
    }
  );

  //   this.actions$.pipe(
  //   ofType(ProjectsActionTypes.LoadProjects), // trigger event
  //   switchMap(
  //     (action: LoadProjects) =>
  //       this.projectsService
  //         .all()
  //         .pipe(map((res: Project[]) => new ProjectsLoaded(res))) // completion event
  //   )
  // );

  @Effect() addProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.AddProject,
    {
      run: (action: AddProject, state: ProjectsState) => {
        return this.projectsService
          .create(action.payload)
          .pipe(map((res: Project) => new ProjectAdded(res)));
      },
      onError: (action: AddProject, error) => {
        console.log(`Error ${error}`);
      }
    }
  );

  //   = this.actions$.pipe(
  //   ofType(ProjectsActionTypes.AddProject),
  //   switchMap((action: AddProject) =>
  //     this.projectsService
  //       .create(action.payload)
  //       .pipe(map((res: Project) => new ProjectAdded(res)))
  //   )
  // );

  //

  @Effect()
  updateProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.UpdateProject,
    {
      run: (action: UpdateProject, state: ProjectsState) => {
        return this.projectsService
          .update(action.payload)
          .pipe(map((res: Project) => new ProjectUpdated(res)));
      },
      onError: (action: UpdateProject, error) => {
        console.error('Error', error);
      }
    }
  );

  @Effect()
  deleteProject$ = this.dataPersistence.pessimisticUpdate(
    ProjectsActionTypes.DeleteProject,
    {
      run: (action: DeleteProject, state: ProjectsState) => {
        return this.projectsService
          .delete(action.payload)
          .pipe(map((res: Project) => new ProjectDeleted(res)));
      },
      onError: (action: DeleteProject, error) => {
        console.error('Error', error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
