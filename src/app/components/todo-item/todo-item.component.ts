import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tarea } from 'src/app/models/tareas.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() tarea: Tarea;
  @Input() last: boolean;

  @Output() modifyTarea = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  editTarea() {
    this.modifyTarea.emit('edit');
  }

  deleteTarea() {
    this.modifyTarea.emit('delete');
  }

  toggleTarea(event: any) {
    // console.log('toggle', event)
    this.modifyTarea.emit('toggle');
  }


}
