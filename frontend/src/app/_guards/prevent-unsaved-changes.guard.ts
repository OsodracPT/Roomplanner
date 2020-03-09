import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ComputerEditComponent } from '../computers/computer-edit/computer-edit.component';

@Injectable({
    providedIn: 'root'
  })

export class PreventUnsavedChanges implements CanDeactivate<ComputerEditComponent> {
    canDeactivate(component: ComputerEditComponent) {
        if (component.form.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
        }
        return true;

    }
}
