//// [typeGuardsWithMultipleConditions.ts]
var x: string|number;
var r4 = typeof x === "string" ? x.substr : x.toFixed; 
var r5 = typeof x === "string" && typeof x === "string" ? x.substr : x.toFixed

//// [typeGuardsWithMultipleConditions.js]
var x;
var r4 = typeof x === "string" ? x.substr : x.toFixed;
var r5 = typeof x === "string" && typeof x === "string" ? x.substr : x.toFixed;
