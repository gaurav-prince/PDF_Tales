import { Component } from '@angular/core';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { MenuController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //  
  // 
  constructor(private filePath: FilePath, private fileChooser: FileChooser, private base64: Base64,
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
      
      // await this.fileChooser.open()
      //   .then(uri => {
      //     this.filePath.resolveNativePath(uri)
      //     .then(filePath => {
      //       let splitPath = filePath.split('/');
      //       let filename = splitPath[splitPath.length-1];
      //       console.log('uri', uri)
      //       let text = this.file.readAsText(this.file.dataDirectory, filename)
      //       console.log('text', text)
      //       return text; 
      //     })
          
      //   })
      //   .catch(e => console.log('error in open file', e));

        this.fileChooser.open().then(uri => {
          console.log('uri'+JSON.stringify(uri));
              // get file path
          this.filePath.resolveNativePath(uri)
          .then(file => {
            console.log('file'+JSON.stringify(file));
            let filePath: string = file;
            if (filePath) {
              
              const reader: FileReader = new FileReader();
              
              let splitPath = filePath.split('/');
              let filename = splitPath[splitPath.length-1];
              splitPath.splice(splitPath.length-1);
              let path: string = splitPath.join('/');
              path+= '/'
              
              console.log(splitPath);
              console.log('Path', path)
              console.log('filename', filename)
              let text = this.file.readAsText(path, filename).then(res => {
                let blob = new Blob([res]);
                reader.readAsText(blob);
                reader.onload = e => {
                  const fileContent: string = reader.result as string;
                  console.log('fileContent', fileContent);
                }
                console.log('blob', blob);
              }).catch( err => console.log(err));

              // reader.onload = e => {
              //   const fileContent: string = reader.result as string;
              //   console.log('fileContent', fileContent);
              // }
              // console.log('text', text);
              
              // console.log('text', text)
              // return text; 
                      // convert your file in base64 format
              // this.base64.encodeFile(filePath)
              //         .then((base64File: string) => {
              //   console.log('base64File'+JSON.stringify(base64File));
              // }, (err) => {
              //   console.log('err'+JSON.stringify(err));
              // });
            }
          })
          .catch(err => console.log(err));
        })
        .catch(e => alert('uri'+JSON.stringify(e)));
    }


    async convertTextToSpeech(text) {
      console.log('text in convert func', text)
      this.textToSpeech.speak(text)
        .then(
          () => console.log('Done')
        )
        .catch((reason: any) => console.log('error in speak teXt', reason));
    }
}