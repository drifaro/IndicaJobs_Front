import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idTema = this.route.snapshot.params['idTema']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(idTema: number) {
    this.temaService.getByIdTema(idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Tema apagado com sucesso!',
        showConfirmButton: false,
        timer: 3000
      })
      this.router.navigate(['/tema'])
    })
  }

}