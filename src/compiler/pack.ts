/// <reference path="sys.ts"/>
var file = sys.readFile("lib.d.ts");
sys.writeFile("lib.d.ts.js", "var stdLib = " + JSON.stringify({ content: file }) + ".content;");
