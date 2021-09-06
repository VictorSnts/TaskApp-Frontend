import { Injectable } from '@angular/core';

// Imports relacionados as chamadas Http
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// Imports relacionados ao tratamento de excecoes
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// Import da classe model
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {
  // URI padrao da API
  url = 'http://localhost:8080/tasks';

  // Igetando HttpClient no constructor
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // --- GET
  // Obtem todas as tarefas
  getTarefas(): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.url)
      .pipe(retry(2),catchError(this.handleError))
  }

  // Obtem tarefa especifica
  getTarefa(idTarefa: number): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.url + "/" + idTarefa)
      .pipe(retry(2),catchError(this.handleError))
  }

  // Obtem as tarefas do dia atual
  getTarefasHoje(): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.url + "/today")
      .pipe(retry(2), catchError(this.handleError))
  }

  // Obtem as tarefas do dia seguinte
  getTarefasAmanha(): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.url + "/tomorrow")
      .pipe(retry(2), catchError(this.handleError))
  }

  // Obtem as tarefas do futuro (> D+1)
  getTarefasFuturo(): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.url + "/future")
      .pipe(retry(2), catchError(this.handleError))
  }

  // Obtem as tarefas do passado (< D)
  getTarefasPassado(): Observable<Tarefa[]> {
    return this.httpClient.get<Tarefa[]>(this.url + "/future")
      .pipe(retry(2), catchError(this.handleError))
  }
  // --- Fim GET

  // --- POST
  // Cadastra nova terafa
  saveTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.url, JSON.stringify(tarefa), this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
  }
  // --- Fim POST

  // --- PUT
  // Atualiza uma tarefa
  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.put<Tarefa>(this.url + '/' + tarefa.id, JSON.stringify(tarefa), this.httpOptions)
      .pipe(retry(1),catchError(this.handleError));
  }
  // --- Fim PUT

  // --- DELETE
  // Deleta uma tarefa
  deleteTarefa(tarefa: Tarefa) {
    return this.httpClient.delete<Tarefa>(this.url + '/' + tarefa.id, this.httpOptions)
      .pipe(retry(1),catchError(this.handleError))
  }
  // --- Fim DELETE

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro no client
      errorMessage = error.error.message;
    } else {
      // Erro no servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
