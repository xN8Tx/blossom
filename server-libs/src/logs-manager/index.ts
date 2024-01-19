import fs from 'fs';

class LogManager {
  private pathToLogs: string | undefined;

  setPathToLogs(path: string) {
    if (!this.pathToLogs) {
      this.pathToLogs = path;
    }
  }

  addToLogs(title: string, errorMessage: string) {
    if (!this.pathToLogs) return console.log('Please set a path to logs!');

    let writeString;
    const time = new Date().toLocaleTimeString();

    if (typeof errorMessage === 'string') {
      writeString = `[${time}]: ${title}. Error message:\n${errorMessage}\n`;
    } else {
      writeString = `[${time}]: ${title}. No error message.`;
    }

    console.log(writeString);

    fs.appendFile(this.pathToLogs, writeString, (error) => {
      if (error) console.log('Logs error: ', error);
      console.log('Successfully write to logs');
    });
  }
}

const errorLogManager = new LogManager();

export { LogManager, errorLogManager };
