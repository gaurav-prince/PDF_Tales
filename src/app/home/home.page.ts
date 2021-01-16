import { Component } from '@angular/core';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //  
  // 
  constructor(private filePath: FilePath, private fileChooser: FileChooser, 
    private file: File, private menu: MenuController, private textToSpeech: TextToSpeech) {
    let fileChosen:any;
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  // openEnd() {
  //   this.menu.open('end');
  // }

  // openCustom() {
  //   this.menu.enable(true, 'custom');
  //   this.menu.open('custom');
  // }
  // getFileInfo(): Promise<any> {
  //   console.log('in get file info');
  //   return this.fileChooser.open().then(fileURI => {
  //       return this.filePath.resolveNativePath(fileURI).then(filePathUrl => {
  //           return this.file
  //               .resolveLocalFilesystemUrl(fileURI)
  //               .then((fileEntry: any) => {
  //                   return new Promise((resolve, reject) => {
  //                       fileEntry.file(
  //                           meta =>
  //                               resolve({
  //                                   nativeURL: fileEntry.nativeURL,
  //                                   fileNameFromPath: filePathUrl.substring(filePathUrl.lastIndexOf('/') + 1),
  //                                   fileContent: fileEntry.readAsText()
  //                               }),
  //                           error => reject(error)
  //                       );
  //                   });
  //               });
  //       });
  //   });
  // }

    async selectAFile() {
      console.log('logging in select file');
      await this.openFile()
          .then(async fileData => {
            console.log('logging', fileData);
            await this.convertTextToSpeech(fileData)
          })
          .catch(error => {
              // something wrong with getting file infomation
              console.log('error in select file', error);
          });
        }

    async openFile() {
      
      await this.fileChooser.open()
        .then(uri => {
          let splitPath = uri.split('/');
          let filename = splitPath[splitPath.length-1];
          console.log(splitPath, filename, uri)
          let text = this.file.readAsText(this.file.dataDirectory, filename)
          console.log('text', text)
          return text; 
        })
        .catch(e => console.log('error in open file', e));
    }

    async convertTextToSpeech(text) {
      this.textToSpeech.speak(text)
        .then(
          () => console.log('Done')
        )
        .catch((reason: any) => console.log('error in speak teXt', reason));
    }
}