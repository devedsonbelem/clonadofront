import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.hideAll();
  }
  questionClick(num : string, bar ?: true){
    if(document.getElementById("item_content"+num).style.display == "block"){
      document.getElementById("item_content"+num).style.display = "none";
      if(bar){
        document.getElementById("bar"+num).style.display = "none";
      }
    }else if(document.getElementById("item_content"+num).style.display == "none"){
      document.getElementById("item_content"+num).style.display = "block";
      if(bar){
        document.getElementById("bar"+num).style.display = "block";
      }

    }
  }

  hideAll(){
    let num = document.getElementsByClassName("FAQ_content").length;
    for(let i = 1; i <= num; i++){
      if(document.getElementById("item_content"+(i))){
        document.getElementById("item_content"+(i)).style.display = "none";
        if(document.getElementById("bar"+(i))){
          document.getElementById("bar"+(i)).style.display = "none";
        }
      }
    }
  }

}
