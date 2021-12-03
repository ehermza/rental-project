import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClientService } from 'src/app/services/client.service';
import { ContainersService } from 'src/app/services/containers.service';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit 
{
  container: any = {};
  client: any = {};
  
  constructor(
      private route: ActivatedRoute,
      private containersService: ContainersService,
      private clientService: ClientService
    ) { }

  ngOnInit(): void {
    let idByUrl = this.route.snapshot.paramMap.get("id");
    if (idByUrl != null) {
      // this.idctner = ver;  deprecated!
      this.getContainer(idByUrl);
    }
    // console.log(`(PageProfile) container: ${this.container}`);
  }

  setClient(idclient:string) {
    this.clientService.getClient(idclient)
      .subscribe(
        (res) => {
          this.client = res;
          console.log('CLIENTE by PageProfile: ', res);
          // console.log(`(PageProfile) Client: ${this.client}`);
        },
        (err) => console.log(err)
      ) 
  }

  getContainer(idctner:String)
   {
    this.containersService.getContainerOne(idctner)
      .subscribe (
         (res) => {
          this.container = res;
			  console.log(this.container);
        const currentClient= this.container.rented_by_id;
          this.setClient(currentClient);
        },
         (err) => console.error(err)
      );
  }
}
