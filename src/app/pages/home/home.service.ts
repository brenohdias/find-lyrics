import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

key: string = '869b0c6b4ab8190f2ff3d000a48b943c';

constructor(private http: HttpClient) { }

getMusic(artist: string, music: string): Observable<any>{
  return this.http.get(`https://api.vagalume.com.br/search.php?art=${artist}&mus=${music}&apikey=${this.key}`)
}

getImg(artist: string): Observable<any>{
  return this.http.get(`https://api.vagalume.com.br/image.php?bandID=${artist}&limit=1&apikey=${this.key}`)
}


}
