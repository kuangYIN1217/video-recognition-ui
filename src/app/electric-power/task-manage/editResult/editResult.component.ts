import { Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ElectricService} from "../../../common/services/electric.service";
@Component({
  selector: 'edit-result',
  styleUrls: ['./editResult.component.css'],
  templateUrl: './editResult.component.html',
  providers: [ElectricService]
})
export class EditResultComponent {
    constructor(private router:Router,private route: ActivatedRoute,private electricService:ElectricService){

    }
}
