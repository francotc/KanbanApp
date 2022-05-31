import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoBoardComponent } from './components/todo-board/todo-board.component';

const routes: Routes = [
  { path: '', component: TodoBoardComponent }
  /*   {
      path: 'login',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    }, */
  /*   {
      path: 'kanban',
      loadChildren: () =>
        import('./kanban/kanban.module').then(m => m.KanbanModule),
      canActivate: [AuthGuard]
    } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
