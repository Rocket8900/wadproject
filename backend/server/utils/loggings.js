// import chalk from "chalk";



// export default class Logging {
//     static log = (args) => {
//       this.info(args);
//     };
  
//     static info = (args) => {
//       console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ?  chalk.blueBright(args) : args);
//     };
  
//     static warn = (args) => {
//       console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === "string" ?  chalk.yellowBright(args) : args);
//     };
  
//     static error = (args) => {
//       console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === "string" ?  chalk.redBright(args) : args);
//     };
//   }
  
import chalk from "chalk";
import path from "path";

export default class Logging {
    static getCallerInfo() {
        const originalFunc = Error.prepareStackTrace;
        try {
            Error.prepareStackTrace = function(_, stack) { return stack; };
            const err = new Error();
            const currentFile = err.stack.shift().getFileName();
            let callerFile, callerFunction;
            while (err.stack.length) {
                const frame = err.stack.shift();
                callerFile = frame.getFileName();
                callerFunction = frame.getFunctionName() || 'anonymous';
                if(currentFile !== callerFile) break;
            }
            const toRemove = path.dirname(callerFile) + path.sep;
            return {
                file: callerFile.replace(toRemove, ""),
                func: callerFunction
            };
        } finally {
            Error.prepareStackTrace = originalFunc;
        }
    }

    static log = (args) => {
      this.info(args);
    };
  
    static info = (args) => {
      const { file, func } = this.getCallerInfo();
      console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO] [${file} -> ${func}]`), typeof args === "string" ?  chalk.blueBright(args) : args);
    };
  
    static warn = (args) => {
      const { file, func } = this.getCallerInfo();
      console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN] [${file} -> ${func}]`), typeof args === "string" ?  chalk.yellowBright(args) : args);
    };
  
    static error = (args) => {
      const { file, func } = this.getCallerInfo();
      console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR] [${file} -> ${func}]`), typeof args === "string" ?  chalk.redBright(args) : args);
    };
}
