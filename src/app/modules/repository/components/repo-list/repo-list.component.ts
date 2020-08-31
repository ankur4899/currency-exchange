import { Component, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {

  repoList = [];
  favouriteList = [];
  constructor(
    private repoService: RepoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.favouriteList = this.repoService.getFavouriteRepo();

    this.repoService.getAllPublicRepos().subscribe((res) => {
      this.repoList = res;
      this.repoList.map((data) => {
        for (const value of this.favouriteList) {
          data.isFavourite = false;
          if (data.id === value.id) {
            data.isFavourite = true;
            break;
          }
        }
        return data;
      });
    }, (err) => {
      console.log('Error', err);
    });
  }

  /**
   * Route to Repo Details Page
   * @param repo //Selected Repository object from list
   */
  repoDetails(repo): void {
    this.router.navigateByUrl(`repo-detail/${repo.owner.login}/${repo.name}`);
  }

  /**
   * Add Repository as Favourite
   * @param repo //Selected Repository object from list
   */
  addAsFavourite(repo): void {
    if (!repo.isFavourite) {
      repo.isFavourite = true;
      this.repoService.setFavouriteRepo(repo);
      this.snackBar.open(`${repo.name} added to Favourite List`, '', {
        duration: 1000
      });
    }
  }

}
