import { Component} from '@angular/core';
import { PlagPositionsService } from '../services/plag-positions.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from '../services/local-storage-manager.service';
import { PlagResponse } from '../models/responses/plag-response';


/**
 * Transmits inputText to PlagPositionsService
 * Capable of reading from .txt files
 */
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  private inputText = 'Die Verwendung dieses oder eines anderen Pseudonyms ist für Mitglieder der DGA streng ' +
    'reglementiert. Ein Regisseur, der für einen von ihm gedrehten Film seinen Namen nicht hergeben möchte,' +
    ' hat nach Sichtung des fertigen Films drei Tage Zeit, anzuzeigen, dass er ein Pseudonym verwenden möchte. ' +
    'Der Rat der DGA entscheidet binnen zwei Tagen über das Anliegen. Erhebt die Produktionsfirma Einspruch, ' +
    'entscheidet ein Komitee aus Mitgliedern der DGA und der Vereinigung der Film- und Fernsehproduzenten, ob der ' +
    'Regisseur ein Pseudonym angeben darf. Über die Beantragung muss der Regisseur Stillschweigen halten, ebenso darf ' +
    'er den fertigen Film nicht öffentlich kritisieren, wenn die DGA ihm die Verwendung eines Pseudonyms zugesteht. ' +
    'Ein Antrag des Regisseurs auf Pseudonymisierung kann abgelehnt werden, so durfte Tony Kaye den Namen Smithee ' +
    'bei dem Film American History X nicht einsetzen, obwohl er den Antrag stellte.';
  private plagName = 'Mein Text';

  private storedRequests: PlagResponse[];
  myAnimationClasses = {
    bounceInLeft: true,
    bounceOutRight: false
  };

  minimumTextLength = 100;
  loading = false;

  constructor(private plagPositionsService: PlagPositionsService,
              private alertService: AlertService,
              private router: Router,
              private localStorageManager: LocalStorageManagerService) {
    this.storedRequests = this.localStorageManager.getRecentlyStoredRequests();
  }

  /**
   * Called when send button was clicked
   * Emits event to toggle components
   */
  send() {
    if (this.inputText !== '' && this.inputText !== undefined && this.minimumTextLength <= this.inputText.length) {

      // Check if the give input is already stored in cache
      if (!this.localStorageManager.checkIfRequestIsAlreadyInLocalStorage(this.inputText)) {
        this.loadResponseFromServer();
      } else {
        this.loadResponseFromLocalStorage();
      }

    } else if (this.inputText === '' || this.inputText === undefined) {
      // Empty textarea
      this.alertService.showAlert('Bitte Text eingeben', 'Bitte geben Sie einen Text zum analysieren ein!', 'warning');
    } else {
      this.alertService.showAlert('Bitte mehr Text eingeben', 'Bitte geben ' +
        'Sie mindestes ' + this.minimumTextLength + ' Zeichen zum analysieren ein!', 'warning');
    }
  }

  /**
   * Delete all in local storage saved plagiarisms
   */
  deleteLocalStorage() {
    this.storedRequests = null;
    this.localStorageManager.clean();
  }

  /**
   * Send a request for a certain input text to server and handle changing to output component
   */
  loadResponseFromServer() {
    // post these json file to server
    this.loading = true;
    this.plagPositionsService.checkForPlag(this.inputText).subscribe(result => {
      (<PlagResponse>result).name = this.plagName;
      (<PlagResponse>result).created_at = Date.now();
      this.localStorageManager.saveResponseToLocalStorage(this.inputText.toString(), JSON.stringify(result));
      console.log('Request is sent to server / mock file is loading ...');
      // set the data to the result
      this.loading = false;
      console.log('sent to output component');
      // Wait before switching to other component to make a smooth fadeout animation
      this.applyAnimationClasses();
      setTimeout(() => this.router.navigate(['/output']), 500);
    });
  }

  /**
   * Load a already performed request from local storage with a given input text
   */
  loadResponseFromLocalStorage() {
    console.log('Loading data from local storage');
    this.plagPositionsService.data = <PlagResponse>JSON.parse(this.localStorageManager.getResponseFromLocalStorage(this.inputText));
    console.log('sent to output component');
    // Wait before switching to other component to make a smooth fadeout animation
    this.applyAnimationClasses();
    setTimeout(() => this.router.navigate(['/output']), 500);
  }

  /**
   * Load a plag which is already stored in local stored
   * @param {number} id the id of the plagiarism
   */
  loadStoredPlagDataWithId(id: number) {
    console.log('Loading data from local storage');
    this.plagPositionsService.data = this.storedRequests[id];
    console.log('sent to output component');
    // Wait before switching to other component to make a smooth fadeout animation
    this.applyAnimationClasses();
    setTimeout(() => this.router.navigate(['/output']), 500);
  }

  applyAnimationClasses() {
    // Animation handling
    this.myAnimationClasses = {
      bounceInLeft: false,
      bounceOutRight: true
    };
  }

  /**
   * open a given txt file and read using FileReader
   * @param event
   */
  openFile(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    for (let index = 0; index < input.files.length; index++) {
      const reader = new FileReader();

      reader.onload = () => {
        this.inputText = reader.result;
      };

      reader.readAsBinaryString(input.files[index]);

    }
  }
}
