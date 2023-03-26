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

  generateQuestions() {

    if(this.text == '') {
      alert('Please enter valid text.')
      return;
    }

    this.spinner.show();
    let object = {text : this.text, wordlength : 100}
    this.dataService.getQustions(object).subscribe(res => {
      console.log(res);
      this.word_count = this.text.split(' ').length;
      this.keywords = res.keywords;
      this.summrized_text = res.summarized_text;
      // this.questions = res.questions;
      this.spinner.hide();
    }, err => {
      console.log(err);
    })
  }

}
