import { ApiPath } from '../services/api.service';

export class SyncTask {
  constructor(public url: ApiPath, public body: any, public params?: string) {}
}
