import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Playlist} from "../../models/playlist";
import {HttpClient} from "@angular/common/http";
import {CreatePlaylistRequest} from "../../../../features/catalogue/models/requests/create-playlist-request";

@Injectable({
  providedIn: 'root'
})
export class PlaylistRepositoryService {

  public constructor(private http: HttpClient) {
  }

  // ------ API ------

  public findAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>("http://localhost:8080/api/v1/playlists").pipe();
  }

  /**
   * If our API returns the ID, we should be able to construct a `Playlist` using the request & response.
   * <br>
   * TODO return `Observable<Playlist>`
   *
   * @param {CreatePlaylistRequest} playlist
   * @returns {Observable<void>}
   */
  public createPlaylist(playlist: CreatePlaylistRequest): Observable<void> {
    return this.http.post("http://localhost:8080/api/v1/playlists", playlist).pipe(
            map((_) => undefined)
    );
  }

}
