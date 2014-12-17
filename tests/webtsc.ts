/// <reference path="websys.ts"/>
/// <reference path="..\src\compiler\tsc.ts"/>

function compile(ioLog: IOLog, stdLib: string, writer: (s: string) => void) {
    ts.sys = createSys(ioLog, stdLib, writer);
    ts.executeCommandLine(ts.sys.args);
}

