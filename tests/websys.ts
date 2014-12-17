/// <reference path="..\src\compiler\core.ts"/>
/// <reference path="..\src\compiler\sys.ts"/>

var nullSys: ts.System = {
    args: [],
    createDirectory: () => undefined,
    directoryExists: () => undefined,
    exit: () => { },
    newLine: "",
    useCaseSensitiveFileNames: false,
    fileExists: () => true,
    getCurrentDirectory: () => "",
    getExecutingFilePath: () => "",
    getMemoryUsage: () => 0,
    readFile:() => "",
    resolvePath: () => "",
    watchFile: () => undefined,
    write: () => { },
    writeFile: () => { }
}

interface IOLog {
    resolvePath: ts.Map<string>;
    fileNames: string[];
    files: Array<{content: string}>;
    args: string[];
}

function createSys(ioLog: IOLog, stdLib: string, writer: (s: string) => void): ts.System {
    var fileMap: ts.Map<{ content: string }> = {};
    var folderMap: ts.Map<string> = {};
    for (var i = 0, len = ioLog.fileNames.length; i < len; ++i) {
        fileMap[ioLog.fileNames[i]] = ioLog.files[i];
        folderMap[ts.getDirectoryPath(ioLog.fileNames[i])] = ioLog.fileNames[i];
    }
    return {
        args: ioLog.args,
        createDirectory: () => undefined,
        directoryExists: p => folderMap[p] !== undefined,
        exit: () => { },
        newLine: "",
        useCaseSensitiveFileNames: false,
        fileExists: f => fileMap[f] !== undefined,
        getCurrentDirectory: () => "",
        getExecutingFilePath: () => "",
        getMemoryUsage: () => 0,
        readFile: f => { 
            var c = fileMap[f];
            if ( ts.getBaseFilename( f ).toLowerCase() === "lib.d.ts" ) {
                return stdLib;
            }
            return c && c.content;
        },
        resolvePath: path => <string>ioLog.resolvePath[path],
        watchFile: () => undefined,
        write: writer,
        writeFile: () => { }
    };
}
ts.sys = nullSys;