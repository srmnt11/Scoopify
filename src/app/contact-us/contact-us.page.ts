import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private toastController: ToastController) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      // Simulate sending the data (you can replace this with an API call)
      console.log('Form Data:', this.contactForm.value);

      // Display a success message
      const toast = await this.toastController.create({
        message: 'Your message has been sent successfully!',
        duration: 3000,
        color: 'success',
      });
      await toast.present();

      // Clear the form
      this.contactForm.reset();
    }
  }
}
