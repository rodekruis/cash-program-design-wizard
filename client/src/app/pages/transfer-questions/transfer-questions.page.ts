import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ApiPath, ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './transfer-questions.page.html',
  styleUrls: ['./transfer-questions.page.scss'],
})
export class TransferQuestionsPage implements OnInit {
  public secret: string;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  public getCsv() {
    this.apiService
      .get(`${ApiPath.scriptsExport}?secret=${this.secret}`)
      .subscribe((response) => {
        console.log('response: ', response);
        this.arrayToCsv(response, `cpdw-export`);
      });
  }

  arrayToCsv(array: any[], filename: string): string {
    if (array.length === 0) {
      return '';
    }

    const columns = Object.keys(array[0]);

    const rows = array.map((row) =>
      columns
        .map((fieldName) => JSON.stringify(row[fieldName] || ''))
        .join(','),
    );

    rows.unshift(columns.join(',')); // Add header row

    saveAs(
      new Blob([rows.join('\r\n')], { type: 'text/csv' }),
      `${filename}-${new Date().toISOString().substr(0, 10)}.csv`,
    );
  }
}
