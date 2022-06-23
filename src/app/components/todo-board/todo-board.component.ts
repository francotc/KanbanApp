import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoListService } from 'src/app/services/todo-list.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalAddTaskComponent } from '../modals/modal-add-task/modal-add-task.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.scss']
})
export class TodoBoardComponent implements OnInit {
  modalRef: MdbModalRef<ModalAddTaskComponent> | null = null;

  constructor(
    public todoListService: TodoListService,
    private modalService: MdbModalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.todoListService.currentList = routeParams.id ?? 'default';
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('drop', event);
    // moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    // this.boardService.sortBoards(this.boards);
  }

  openAdd() {
    this.modalRef = this.modalService.open(ModalAddTaskComponent, {
      modalClass: 'modal-frame modal-bottom',
    })
    this.modalRef.onClose.subscribe((texto: any) => {
      this.todoListService.addBoard(texto);
    });
  }

}
