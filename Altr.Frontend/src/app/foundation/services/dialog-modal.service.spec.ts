import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogModalService } from './dialog-modal.service';

describe('DialogModalService', () => {
  let service: DialogModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule]
    });
    service = TestBed.inject(DialogModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
