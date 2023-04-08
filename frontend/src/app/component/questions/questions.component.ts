import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  text : string = '';
  keywords : string[] = [];
  summrized_text : string = '';
  questions : any;
  word_count : number = 0;
  constructor(private dataService : DataService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  
  file:any;
  fileChanged(e) {
      this.file = e.target.files[0];
  }

  generateQuestions() {
    
    if(this.text == '' && this.file === undefined) {
      alert('Please enter valid text.')
      return;
    }
    if(this.file !== undefined ) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.text = fileReader.result;
      }
      fileReader.readAsText(this.file);
    }
    
    this.spinner.show();
    let object = {text : this.text, wordlength : 100}
    this.dataService.getQustions(object).subscribe(res => {
      console.log(res);
      this.word_count = this.text.split(' ').length;
      this.keywords = res.keywords;
      this.summrized_text = res.summarized_text;
      this.summrized_text.replace(/\[.*?\]/g,"");
      this.questions = res.questions;
      this.spinner.hide();
    }, err => {
      console.log(err);
    })
  }

}
