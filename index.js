import __wbg_init from "./pkg/wasm_rust_testings.js";

const runWasm = async () => {
	// instantiate our wasm module
	console.log("Initializing Web Assembly");
	const wasmMod = await __wbg_init("./pkg/wasm_rust_testings_bg.wasm");

	// call the add function
	const addResult = wasmMod.add(10, 40);

	// set result to body
	// document.body.textContent += `Hello Wasm Testing 2. addResults: ${addResult}`;
	console.log("Math compute");	
	// wasm for for loop
	const startTime = performance.now();
	const mathCompute = wasmMod.compute_math(BigInt(10));
	const endTime = performance.now();
	const elapsedTime = endTime - startTime;
	console.log(`Time taken is ${elapsedTime}`);
	document.body.textContent += `Math perform. ${mathCompute}`;

};

runWasm();
