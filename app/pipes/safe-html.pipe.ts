import {DomSanitizer} from "@angular/platform-browser";
import {Pipe, PipeTransform} from "@angular/core";

/**
 * DomSanitizer is disabled because otherwise id attributes would not be accessible
 */
@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
