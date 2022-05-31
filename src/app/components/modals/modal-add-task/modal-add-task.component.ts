import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal-add-task',
  templateUrl: './modal-add-task.component.html',
  styleUrls: ['./modal-add-task.component.scss']
})
export class ModalAddTaskComponent implements OnInit {

  content :string = '';

  constructor(
    public modalRef: MdbModalRef<ModalAddTaskComponent>
  ) { }

  ngOnInit(): void {
  }

  save(msg: string): void {
    console.log('content', this.content);
    this.modalRef.close(msg)
  }

}
