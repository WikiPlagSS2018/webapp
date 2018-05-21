import { Component, EventEmitter, Output } from '@angular/core';
import { PlagPositionsService } from '../services/plag-positions.service';
import { AlertService } from '../services/alert.service';
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
  private inputText: string = 'Die Verwendung dieses oder eines anderen Pseudonyms ist für Mitglieder der DGA streng reglementiert. Ein Regisseur, der für einen von ihm gedrehten Film seinen Namen nicht hergeben möchte, hat nach Sichtung des fertigen Films drei Tage Zeit, anzuzeigen, dass er ein Pseudonym verwenden möchte. Der Rat der DGA entscheidet binnen zwei Tagen über das Anliegen. Erhebt die Produktionsfirma Einspruch, entscheidet ein Komitee aus Mitgliedern der DGA und der Vereinigung der Film- und Fernsehproduzenten, ob der Regisseur ein Pseudonym angeben darf. Über die Beantragung muss der Regisseur Stillschweigen halten, ebenso darf er den fertigen Film nicht öffentlich kritisieren, wenn die DGA ihm die Verwendung eines Pseudonyms zugesteht. Ein Antrag des Regisseurs auf Pseudonymisierung kann abgelehnt werden, so durfte Tony Kaye den Namen Smithee bei dem Film American History X nicht einsetzen, obwohl er den Antrag stellte.';

  myAnimationClasses = {
    bounceInLeft: true,
    bounceOutRight: false
  };

  minimumTextLength = 100;
  loading = false;

  constructor(private plagPositionsService: PlagPositionsService, private alertService: AlertService) {
  }

  /**
   * Used to toggle from input.component to output.component in app.component
   */
  @Output() sendEventEmitter = new EventEmitter();

  /**
   * Called when send button was clicked
   * Emits event to toggle components
   */
  send() {
    //TODO: Do some other validations like length validation
    if(this.inputText != '' && this.inputText != undefined && this.minimumTextLength <= this.inputText.length){
    // if (true) {
      // post these json file to server
      this.loading = true;
      this.plagPositionsService.checkForPlag(this.inputText).subscribe(result => {
        //set the data to the result
        this.loading = false;
        console.log('sent to output component');
        //switch to other component
        this.applyAnimationClasses();
        this.sendEventEmitter.emit();
      })
    } else if (this.inputText === '' || this.inputText === undefined) {
      //Empty textarea
      this.alertService.showAlert('Bitte Text eingeben', 'Bitte geben Sie einen Text zum analysieren ein!', 'warning');
    } else {
      this.alertService.showAlert('Bitte mehr Text eingeben', 'Bitte geben Sie mindestes ' + this.minimumTextLength + ' Zeichen zum analysieren ein!', 'warning');
    }
  }

  applyAnimationClasses() {
    //Animation handling
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
