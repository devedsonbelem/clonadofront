import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';@Injectable()
@Injectable()
export class LocalStorageService {
     constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { } 

	 public set(key : string, value : any){
		 this.storage.remove(key);
		 this.storage.set(key,value);
	 }

	 public get(key : string) : any{
		 return this.storage.get(key);
	 }
	 public delete(key : string){
		 this.storage.remove(key);
	 }

        
}