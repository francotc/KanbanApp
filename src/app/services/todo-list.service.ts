import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stats, Tarea } from '../models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  boards: any = {};
  tareas: Tarea[] = [];
  currentList: string;

  private taskStats = new BehaviorSubject<Stats>({ pending: 0, completed: 0 });
  taskStats$ = this.taskStats.asObservable();


  constructor() {
    console.log('se construye')
    this.recuperarTareas();
  }


  recuperarTareas() {
    const localStorageDataBoards = localStorage.getItem('boards');
    if (localStorageDataBoards) {
      this.boards = JSON.parse(localStorageDataBoards);
      this.updateTaskStats();
    }
  }
  private guardarTareas() {
    localStorage.setItem('boards', JSON.stringify(this.boards));
  }
  private updateTaskStats() {
    /*  const pending = this.tareas.filter(tarea => !tarea.estado).length;
     const completed = this.tareas.filter(tarea => tarea.estado).length;
     this.taskStats.next({ pending, completed }); */
  }
  private changeTask() {
    this.guardarTareas();
    this.updateTaskStats();
  }


  addTask(texto: string, board: number) {
    if (texto) {
      this.boards[this.currentList][board].tareas.push({ texto, estado: false });
      this.changeTask();
    }
  }

  addBoard(texto: string) {
    if (texto) {
      this.boards[this.currentList] ??= [];
      this.boards[this.currentList].push({ texto, tareas: [] });
      this.changeTask();
    }
  }

  editTask(index: number, texto: string, board: number) {
    if (texto) {
      this.boards[this.currentList][board].tareas[index].texto = texto;
      this.changeTask();
    }
  }

  removeTask(index: number, board: number) {
    this.boards[this.currentList][board].tareas.splice(index, 1);
    this.changeTask();
  }

  toggleTask(index: number, board: number) {
    this.boards[this.currentList][board].tareas[index].estado = !this.boards[this.currentList][board].tareas[index].estado;
    this.changeTask();
  }

  getTaskText(index: number, board: number) {
    console.log(this.boards, index, board)
    return this.boards[this.currentList][board].tareas[index].texto;
  }

}
