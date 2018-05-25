import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { PlagResponse } from '../models/responses/plag-response';

/**
 * Managing local storage
 * Idea is to save requests the user have done recently
 * Format:
 * key: plag+{md5 checksum of input text}
 * value: base64 encoded json response which was given by the server last time
 */
@Injectable()
export class LocalStorageManagerService {

  /**
   * Check if a given input text + response is already stored in local storage
   * @param {string} inputText the given input text
   * @returns {boolean} true in case the input text already exists
   */
  checkIfRequestIsAlreadyInLocalStorage(inputText: string) : boolean{
    if (localStorage.getItem("plag" + Md5.hashStr(inputText).toString()) === null) {
      //Request isn't cached in local storage
      return false;
    }
    return true;
  }

  clean(){
    window.localStorage.clear();
  }

  /**
   * Get all requests from local storage
   * @returns {PlagResponse[]} an array with all stored PlagResponses
   */
  getRecentlyStoredRequests(): PlagResponse[]{
    let keys = Object.keys(localStorage);
    let storedPlags = []
    //Iterate through each key in localStorage and check if its a plag
    for(let i = 0; i < keys.length; i++){
      if(keys[i].indexOf("plag") !== -1){
        storedPlags.push(<PlagResponse>JSON.parse(this.a2b(localStorage.getItem(keys[i]))));
      }
    }

    //Sort by date of creation
    storedPlags.sort((a, b) => ((<PlagResponse>b).created_at - (<PlagResponse>a).created_at));

    return storedPlags;
  }

  /**
   * Save a currently received response to local storage
   * @param {string} inputText
   * @param {string} response
   */
  saveResponseToLocalStorage(inputText: string, response: string){
    //Remove non printable ascii chars -->  https://www.w3resource.com/javascript-exercises/javascript-string-exercise-32.php
    let valueBase64 = this.b2a(response.replace(/[^\x20-\x7E]/g, ''));
    let keyChecksum = Md5.hashStr(inputText).toString();
    localStorage.setItem("plag:" + keyChecksum, valueBase64);
  }

  /**
   * Get the saved response object from local storage
   * @param {string} inputText the input text which was entered by user
   * @returns {string} the response which was given from server as a json string
   */
  getResponseFromLocalStorage(inputText: string) : string{
    return this.a2b(localStorage.getItem("plag" + Md5.hashStr(inputText).toString()));
  }

  /**
   * Convert to base64 equivalent
   * @param {string} a base64 encoded string
   * @returns {string} decoded text
   */
  private b2a(a: string): string {
    var c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
    if (!a) return a;
    do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e,
      f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < a.length);
    return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
  }


  /**
   * Convert from base64 to text
   * @param {string} a text
   * @returns {string} base64 equivalent
   */
  private a2b(a: string): string {
    var b, c, d, e = {}, f = 0, g = 0, h = "", i = String.fromCharCode, j = a.length;
    for (b = 0; 64 > b; b++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
    for (c = 0; j > c; c++) for (b = e[a.charAt(c)], f = (f << 6) + b, g += 6; g >= 8; ) ((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
    return h;
  }
}
