import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserFull, UsersServerService} from "../../../services/server/users-server.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  user: UserFull

  constructor(private route: ActivatedRoute,
              private usersServerService: UsersServerService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.usersServerService.getById(+params.id)
        .subscribe(user => {
          this.user = user
          console.log(this.user.name)
        })
    })
  }

}
