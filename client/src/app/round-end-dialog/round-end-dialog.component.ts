import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScoreModel } from '../score-model';

@Component({
  selector: 'app-round-end-dialog',
  templateUrl: './round-end-dialog.component.html',
  styleUrls: ['./round-end-dialog.component.css', '../app.component.css']
})
export class RoundEndDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ScoreModel) { }

  ngOnInit(): void {
    console.log('data');
    console.log(this.data);
  }
}
