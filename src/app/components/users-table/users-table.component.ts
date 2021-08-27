import {Component, ViewChild, OnInit, HostListener} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User, UsersServerService} from "../../services/server/users-server.service";


@Component({
  selector: 'app-table-material',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})

export class UsersTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'city', 'phone'];
  usersData: User[] = []
  fetchedUsers: User[] = []

  dataSource: MatTableDataSource<User>;
  @ViewChild(MatSort) sort: MatSort;

  private readonly FETCH_DATA_LIMIT = 4
  public isLoading: boolean | null = false

  constructor(private usersServerService: UsersServerService) {

  }

  loadData(start = 0, limit = 1): void {
    this.usersServerService.fetchUsers(start, limit)
      .subscribe((users => {
        users.map((user => {
          this.fetchedUsers.push({
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.address.city,
            phone: user.phone
          })
        }))
        if(!this.fetchedUsers.length){
          console.warn('No Fetched Data: ', this.fetchedUsers)
          this.isLoading = null
        } else {
          this.usersData = [...this.usersData, ...this.fetchedUsers]
          this.dataSource = new MatTableDataSource(this.usersData);
          this.dataSource.sort = this.sort;
          this.fetchedUsers = []
          this.isLoading = false
        }
      }));
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): any {
    this.isLoading = true
    this.loadData(0, this.FETCH_DATA_LIMIT)
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if (this.isLoading === false) {
      //In chrome and some browser scroll is given to body tag
      let pos: number = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max: number = document.documentElement.scrollHeight;

      // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
      if (pos >= max) {
        console.log("window:scroll", this.usersData.length)
        this.loadData(this.usersData.length, this.FETCH_DATA_LIMIT)
        this.isLoading = true
      }
    }

  }


}
