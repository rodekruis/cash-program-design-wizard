import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { saveAs } from 'file-saver';
import { StateService } from 'src/app/services/state.service';
import { ApiPath, ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.page.html',
  styleUrls: ['./manage-questions.page.scss'],
})
export class ManageQuestionsPage implements OnInit {
  @ViewChild('importFile')
  public importFile: IonInput;

  public exportSecret: string;
  public exportError: string;
  public exportInProgress = false;

  public importSecret: string;
  public importError: string;
  public importResult: string | number;
  public importInProgress = false;

  constructor(private apiService: ApiService, public state: StateService) {}

  ngOnInit() {}

  public exportCsv() {
    this.exportError = '';
    this.exportInProgress = true;
    this.state.isLoading = true;

    this.apiService
      .post(ApiPath.scriptsExport, {
        secret: this.exportSecret,
      })
      .subscribe(
        (response) => {
          const csvData = this.arrayToCsv(response);
          saveAs(
            new Blob([csvData], { type: 'text/csv' }),
            `cpdw-export-all_${new Date().toISOString().substring(0, 10)}.csv`,
          );
          this.exportSecret = '';
          this.exportError = '';
          this.exportInProgress = false;
          this.state.isLoading = false;
        },
        (error) => {
          this.exportError = error.message;
          this.state.isLoading = false;
        },
      );
  }

  public async importCsv() {
    const nativeInput = await this.importFile.getInputElement();

    if (!nativeInput || !nativeInput.files || !nativeInput.files.length) {
      return;
    }

    this.importError = '';
    this.importResult = '';
    this.importInProgress = true;
    this.state.isLoading = true;

    const formData = new FormData();
    formData.append('secret', this.importSecret);
    formData.append('file', nativeInput.files[0]);

    this.apiService.post(ApiPath.scriptsImport, formData, null, true).subscribe(
      (response) => {
        this.importInProgress = false;
        this.state.isLoading = false;
        if (response.status === 'success') {
          this.importSecret = '';
          this.importError = '';
          this.importResult = response.length;
          return;
        }
        if (response.status === 'error') {
          this.importError = response.message;
          return;
        }
      },
      (error) => {
        console.log('Error from import-endpoint:', error);
        this.importError = error.error.message;
        this.importInProgress = false;
        this.state.isLoading = false;
      },
    );
  }

  private arrayToCsv(array: any[], separator: ',' | ';' = ','): string {
    if (array.length === 0) {
      return '';
    }

    const columns = Object.keys(array[0]);

    const rows = array.map((row) =>
      columns
        .map((fieldName) => JSON.stringify(row[fieldName] || ''))
        .join(separator),
    );

    rows.unshift(columns.join(separator)); // Add header row

    return rows.join('\r\n');
  }
}
