import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ChecklistService } from 'src/app/api/service/checklist.service';
import { StorageService } from 'src/app/api/service/storage.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  id: any;
  checklists: any;

  constructor(
    public checklistService: ChecklistService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.get('id_loc_check').then(value => {
      this.id = value;
      let checklist = { id_loc: this.id };
      this.checklistService.historico_checklist(checklist).subscribe(data => {
        if (data.status == false) {
          this.checklists = false;
        } else {
          this.checklists = data;
          console.log('checklists', this.checklists);
        }
        console.log(this.checklists);
      });
    }, error => {
      console.log(error);
    });
  }

  async verChecklist(id_check) {
    await Browser.open({ url: this.checklistService.url + '../documentos/ver_checklist_id/' + id_check });
  }
}
