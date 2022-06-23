import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ModalAddTaskComponent } from '../modals/modal-add-task/modal-add-task.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() board: any;
  @Input() indexBoard: number;

  modalRef: MdbModalRef<ModalAddTaskComponent> | null = null;

  taskStats = this.todoListService.taskStats$;

  constructor(
    private modalService: MdbModalService,
    private todoListService: TodoListService,
  ) { }

  ngOnInit(): void {
    this.todoListService.recuperarTareas();

    /* this.taskStats.subscribe(stats => {
      console.log(stats);
    }); */
  }

  modifyTarea(accion: string, index: number) {
    switch (accion) {
      case 'edit':
        this.openEdit(index);
        break;
      case 'delete':
        this.todoListService.removeTask(index, this.indexBoard);
        break;
      case 'toggle':
        this.todoListService.toggleTask(index, this.indexBoard);
        break;
    }
  }

  openAddTask() {
    console.log('openAddTask');
    this.modalRef = this.modalService.open(ModalAddTaskComponent, {
      modalClass: 'modal-frame modal-bottom',
    })
    this.modalRef.onClose.subscribe((texto: any) => {
      this.todoListService.addTask(texto, this.indexBoard);
    });
  }
  openEdit(index: number) {
    const content = this.todoListService.getTaskText(index, this.indexBoard);
    this.modalRef = this.modalService.open(ModalAddTaskComponent, {
      data: { content },
      modalClass: 'modal-frame modal-bottom',
    })
    this.modalRef.onClose.subscribe((texto: any) => {
      this.todoListService.editTask(index, texto, this.indexBoard);
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    event.container.data.map((element, index) => element.orden = index);
  }

  get tareas() {
    return this.todoListService.tareas;
  }
  get taskStats$() {
    return this.todoListService.taskStats$;
  }

}
