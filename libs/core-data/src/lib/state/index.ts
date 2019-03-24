import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';
export interface AppState {
  customers: fromCustomers.CustomersState;
  projects: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducer
};

// -------------------------------------------------------------------
// PROJECTS SELECTORS
// -------------------------------------------------------------------
// THIS ALLOWS US TO GRAB A SLICE OF STATE FROM THE STORE.
// AND IS SPECIFIC TO A FEATURE IN THIS CASE THE PROJECTS.
export const selectProjectsState = createFeatureSelector<
  fromProjects.ProjectsState
>('projects');

export const selectProjectIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);

export const selectProjetEntitites = createSelector(
  selectProjectsState,
  fromProjects.selectProjectEntities
);

export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<
  fromCustomers.CustomersState
>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);
