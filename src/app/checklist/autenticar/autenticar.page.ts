import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { ChecklistService } from 'src/app/api/service/checklist.service';
import { ToastService } from 'src/app/api/service/toast.service';
import { StorageService } from 'src/app/api/service/storage.service';
import { ChecklistModel } from 'src/app/model/shared/checklistModel';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.page.html',
  styleUrls: ['./autenticar.page.scss'],
})
export class AutenticarPage implements OnInit {

  usuario = new ChecklistModel();
  registerForm: FormGroup;
  submitted = false;
  inputs = { login: '', senha: '' };

  constructor(private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public nav: NavController,
    public toastService: ToastService,
    private storageService: StorageService,
    public checklistService: ChecklistService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();

    this.checklistService.login(this.inputs).subscribe((data: any) => {
      if (data.status === false) {
        loading.dismiss();
        this.toastService.showError(data.message);
      } else {
        loading.dismiss();
        this.toastService.showSucess('Logado com sucesso');
        this.storageService.set("check", data.usuario);
        this.nav.navigateRoot('/checklist');
      }
    }, error => {
      console.log(error);
    });

    //alert('SUCCESS!! :-)' + JSON.stringify(this.inputs));
  }
}
