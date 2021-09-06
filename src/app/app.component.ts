import { Tarefa } from './models/tarefa';

import { Component, OnInit } from '@angular/core';
import { TarefaService } from './services/tarefa.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  tarefa = {} as Tarefa;
  tarefas: Tarefa[] = [];

  constructor(private tarefaService: TarefaService) {}
  
  ngOnInit() {
    this.getTarefas();
  }

  // Verifica se a tarefa ira ser salva ou editada
  saveTarefa(form: NgForm) {
    if (this.tarefa.id !== undefined) {
      this.tarefaService.updateTarefa(this.tarefa).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.tarefaService.saveTarefa(this.tarefa).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o servico que tras todos as tarefas
  getTarefas(){
    this.tarefaService.getTarefas().subscribe((tarefas: Tarefa[]) => {this.tarefas = tarefas})
  }

  // Chama o servico que deleta uma tarefa
  deleteTarefa(tarefa: Tarefa){
    this.tarefaService.deleteTarefa(tarefa).subscribe(() => {this.getTarefas})
  }

  // Copia a tarefa para ser editado
  editTarefa(tarefa: Tarefa) {
    this.tarefa = { ...tarefa };
  }

  // Limpa o formulario
  cleanForm(form: NgForm) {
    this.getTarefas();
    form.resetForm();
    this.tarefa = {} as Tarefa;
  }
}