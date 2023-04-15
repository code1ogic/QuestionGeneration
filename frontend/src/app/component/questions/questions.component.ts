import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  text : any = '';
  keywords : string[] = [];
  summrized_text : string = '';
  questions : any[] = [];
  word_count : number = 0;
  constructor(private dataService : DataService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.keywords = [];
    this.summrized_text = '';
    this.questions = [];
    this.word_count = 0;
  }
  
  file:any;
  fileChanged(e : any) {
      this.file = e.target.files[0];
      if(this.file !== undefined ) {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.ngOnInit();
          this.text = fileReader.result;
        }
        fileReader.readAsText(this.file);
      }
  }

  generateQuestions() {
    
    if(this.text == '' && this.file === undefined) {
      alert('Please enter valid text.')
      return;
    }
    
    this.spinner.show();
    let object = {text : this.text, wordlength : 100}
    this.dataService.getQustions(object).subscribe(res => {
      this.word_count = this.text.split(' ').length;
      this.formatResult(res);
    }, err => {
      console.log(err);
    })
  }

  generateSummary() {
    if(this.text == '' && this.file === undefined) {
      alert('Please enter valid text.')
      return;
    }
    
    this.spinner.show();
    let object = {text : this.text, wordlength : 100}
    this.dataService.getSummary(object).subscribe(res => {
      this.word_count = this.text.split(' ').length;
      this.summrized_text = res.summarized_text;
      this.summrized_text = this.summrized_text.replace(/\[.*?\]/g,"");
      this.spinner.hide();
    }, err => {
      console.log(err);
    })
  }

  formatResult(res: any) {
    this.keywords = res.keywords;
    this.summrized_text = res.summarized_text;
    this.summrized_text = this.summrized_text.replace(/\[.*?\]/g,"");
    this.questions = res.questions;
    this.questions.forEach(q => {
      q = q.toString().replace(/\[.*?\]/g,"");
    })
    this.spinner.hide();
  }

}
