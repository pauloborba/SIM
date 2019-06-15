import { Component, OnInit } from '@angular/core';
import {Monitor} from '../monitor'
import { MonitorService } from '../monitor.service';
@Component({
  selector: 'app-root',
  templateUrl: './disponibilidade.component.html',
  styleUrls: ['./disponibilidade.component.css']
})
export class DisponibilidadeComponent implements OnInit {

  constructor(private monitorService: MonitorService) { }
  
  monitores: Monitor[] = [];

  ngOnInit() {
    this.monitorService.getMonitores()
    .then(ms => this.monitores = ms)
    .catch(erro => alert(erro));
  }

}