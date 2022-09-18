// class BankAccount {
//   constructor(balance = 0) {
//     this.balance = balance;
//   }

//   deposit(amount) {
//     this.balance += amount;
//     console.log(
//       `Deposited ${amount}, balance is now ${this.balance}`
//     );
//   }

//   withdraw(amount) {
//     if (this.balance - amount >= BankAccount.overdraftLimit) {
//       this.balance -= amount;
//       console.log(
//         `Withdrew ${amount}, balance is now ${this.balance}`
//       );
//       return true;
//     }
//     return false;
//   }

//   toString() {
//     return `Balance: ${this.balance}`;
//   }
// }
// BankAccount.overdraftLimit = -500;

// let Action = Object.freeze({
//   'deposit': 1,
//   'withdraw': 2
// });

// class BankAccountCommand {
//   constructor(account, action, amount) {
//     this.account = account;
//     this.action = action;
//     this.amount = amount;
//     this.succeeded = false;
//   }

//   call() {
//     // eslint-disable-next-line default-case
//     switch (this.action) {
//       case Action.deposit:
//         this.account.deposit(this.amount);
//         this.succeeded = true;
//         break;
//       case Action.withdraw:
//         this.succeeded = this.account.withdraw(this.amount);
//         break;
//     }
//   }

//   undo() {
//     if (!this.succeeded) return;
//     // eslint-disable-next-line default-case
//     switch (this.action) {
//       case Action.deposit:
//         this.account.withdraw(this.amount);
//         break;
//       case Action.withdraw:
//         this.account.deposit(this.amount);
//         break;
//     }
//   }
// }

// let ba = new BankAccount(100);

// let cmd = new BankAccountCommand(ba, Action.deposit, 50);
// cmd.call();
// console.log(ba.toString());

// console.log('Performing undo:');
// cmd.undo();
// console.log(ba.toString());






//Script file



document.addEventListener('DOMContentLoaded', function () {
  var txl = document.getElementsByTagName('textarea').length;
  // alert(txl);

  let text = '';

  for (let i = 1; i < txl + 1; i++) {
    text1 = 'phraseDiv-' + i;
    document.getElementById(text1).readOnly = 'true';
    document.getElementById(text1).innerHTML = '';
  }
});

function btn_click(clickid) {
  var speak = document.getElementById(clickid);

  //alert(clickid);

  myArray = clickid.split('-');
  //TEXXTBOX
  TextBoxT = 'phraseDiv-' + myArray[1];

  //SPEAKBUTTON
  speakbtnT = 'speakbtn-' + myArray[1];
  //speakbtnli="speakli-"+myArray[1];

  //stop speak button
  stopbtnT = 'stopspeakbtn-' + myArray[1];
  //stopbtnli="stopspeakli-"+myArray[1];

  var speak = document.getElementById(speakbtnT),
    //speakli = speakbtnli,

    //stopspeakli = stopbtnli,
    stopspeak = document.getElementById(stopbtnT),
    upload = document.getElementById('uploadbtn'),
    stopupload = document.getElementById('stopuploadbtn'),
    fileinput = document.getElementById('fileinput'),
    speechout = document.getElementById(TextBoxT),
    lastRecognized = '',
    recognizer,
    SpeechSDK = window.SpeechSDK,
    fileAbortCallback = null;
  //alert(speakbtnT+ "/"+stopbtnT);

  var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();

  speak.style = 'display:none';
  stopspeak.style = 'opacity:0.8';
  upload.disabled = true;
  lastRecognized = '';

  speechout.innerHTML = '';

  recognizeOneAudioConfig(audioConfig, function () {
    if (stopspeak.disabled === false) {
      stopspeak.click();
    }
  });

  function recognizeOneAudioConfig(audioConfig, completionCallback) {
    var config = SpeechSDK.SpeechConfig.fromSubscription('c15a622fc8a142b080410f754797ad56', 'eastus');

    config.enableDictation();

    //     config.setServiceProperty('punctuation', 'explicit', SpeechSDK.ServicePropertyChannel.UriQueryParameter);

    config.speechRecognitionLanguage = 'en-US';

    config.setProperty(SpeechSDK.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, '3000');
    config.setProperty(SpeechSDK.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, '3000');

    recognizer = new SpeechSDK.SpeechRecognizer(config, audioConfig);

    // The event recognizing signals that an intermediate recognition result is received.
    // You will receive one or more recognizing events as a speech phrase is recognized, with each containing
    // more recognized speech. The event will contain the text for the recognition since the last phrase was recognized.
    recognizer.recognizing = function (s, e) {
      speechout.innerHTML = lastRecognized + e.result.text;
    };

    recognizer.canceled = function (s, e) {
      var details;

      if (e.reason === SpeechSDK.CancellationReason.EndOfStream) {
        lastRecognized +=
          '--------------------------------------------------------------------------------\r\n\r\n';
        speechout.innerHTML = lastRecognized;
      } else {
        details = SpeechSDK.CancellationDetails.fromResult(e.result);

        if (details.reason === SpeechSDK.ErrorCode.ConnectionFailure) {
          lastRecognized += 'An error occurred while loading this demo, please reload and try again';
        } else {
          lastRecognized += 'Recognition was canceled due to error ' + e.errDetails;
        }
      }
      completionCallback();
    };

    // The event recognized signals that a final recognition result is received.
    // This is the final event that a phrase has been recognized.
    // For continuous recognition, you will get one recognized event for each phrase recognized.
    recognizer.recognized = function (s, e) {
      var resultText;

      // Indicates that recognizable speech was not detected, and that recognition is done.
      if (e.result.reason !== SpeechSDK.ResultReason.RecognizedSpeech) {
        resultText = '';
        completionCallback();
      } else {
        resultText = e.result.text;
      }

      lastRecognized += resultText + ' ';
      speechout.innerHTML = lastRecognized;
    };

    recognizer.startContinuousRecognitionAsync(
      function () { },
      function (error) {
        if (error.includes('1006')) {
          speechout.innerHTML += 'An error occurred while loading , please reload and try again';
        } else {
          speechout.innerHTML = 'Cannot Recognize Speech' + ' ' + error;
        }
      },
    );
  }
  function recognizeFile(i) {
    var audioConfig, file;

    if (fileAbortCallback) {
      fileAbortCallback();
      return;
    }

    if (i >= fileinput.files.length) {
      stopupload.click();
      fileAbortCallback();
      return;
    }

    file = fileinput.files[i];
    lastRecognized +=
      'File: ' +
      file.name +
      '\r\n--------------------------------------------------------------------------------\r\n';
    speechout.innerHTML = lastRecognized;

    audioConfig = SpeechSDK.AudioConfig.fromWavFileInput(file);
    recognizeOneAudioConfig(audioConfig, function () {
      recognizeFile(i + 1);
    });
  }

  upload.addEventListener('click', function () {
    fileinput.click();
  });

  fileinput.addEventListener('change', function () {
    lastRecognized = '';
    if (fileinput.files.length > 5) {
      speechout.innerHTML = localizedResources.srTooManyFiles;
      return;
    }

    speak.disabled = true;
    uploadli.style = 'display:none';
    stopuploadli.style = '';
    recognizeFile(0);
  });

  stopupload.addEventListener('click', function () {
    stopupload.disabled = true;
    fileAbortCallback = function () {
      stopupload.disabled = false;
      speak.disabled = false;
      uploadli.style = '';
      stopuploadli.style = 'display:none';
      fileAbortCallback = null;
    };
  });

  stopspeak.addEventListener('click', function () {
    stopspeak.style = 'display:none';
    speak.style = '';
    upload.disabled = false;
    if (recognizer !== null) {
      recognizer.stopContinuousRecognitionAsync(function () {
        recognizer.close();
        recognizer = null;
      });
    }
  });
}
