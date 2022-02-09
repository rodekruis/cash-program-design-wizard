import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ApiPath, ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.page.html',
  styleUrls: ['./manage-questions.page.scss'],
})
export class ManageQuestionsPage implements OnInit {
  public exportError = false;
  public exportInProgress = false;

  public secret: string;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  public exportCsv() {
    this.exportError = false;
    this.exportInProgress = true;

    this.apiService
      .post(ApiPath.scriptsExport, { secret: this.secret })
      .subscribe(
        (response) => {
          const csvData = this.arrayToCsv(response);
          saveAs(
            new Blob([csvData], { type: 'text/csv' }),
            `cpdw-export-all_${new Date().toISOString().substr(0, 10)}.csv`,
          );
          this.secret = '';
          this.exportError = false;
          this.exportInProgress = false;
        },
        () => {
          this.exportError = true;
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
