import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  titleMusic = '';
  artist: string = '';
  music: string = '';
  lyricMusic: string= '';
  artistMusic: string= '';
  translatedMusic: string= '';
  translatedMusic2: string= '';
  enableButton: boolean= true;
  artistMusicImg: string= '';
  img: string= '';
  invisible: string= 'invible';
  link: string='';


  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  findLyrics(){
    this.homeService.getMusic(this.artist, this.music).subscribe(
      (result: any) => {
        if(result.type == 'notfound' || result.type == 'song_notfound'){
          this.titleMusic = "Não foi possível encontrar resultado"
          this.lyricMusic = "";
          this.artistMusic = "";
          this.translatedMusic2 = "";
          this.artistMusicImg = "";
          this.invisible="invisible";
          this.enableButton = true;
        }
        else{
        console.log('Sucesso' ,result)
        this.lyricMusic = result.mus[0].text;
        this.titleMusic = result.mus[0].name;
        this.artistMusic = result.art.name;
        this.artistMusicImg = result.art.id;
        this.translatedMusic2 = "";
        this.invisible="img";
        this.link= result.art.url;
        this.bringImage();
      }

      if(result.mus[0].translate){
        this.translatedMusic = result.mus[0].translate[0].text;
        this.enableButton = false;
      }
      else{
        this.translatedMusic = "";
        this.enableButton = true;
      }
      },
      (error: any) =>{
        alert('Não foi possível encontrar nenhum resultado')
      },
    )
  }
  translate(){
    if(this.translatedMusic2 == this.translatedMusic){
      this.translatedMusic2 = "";
    }
    else{
    this.translatedMusic2 = this.translatedMusic;
    }
  }

  bringImage(){
    var artist = this.artistMusicImg;

    this.homeService.getImg(artist).subscribe(
          (img: any) => {
            this.img= img.images[0].url;
          }
    );
  }
}
