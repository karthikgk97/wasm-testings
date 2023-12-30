// app/page.tsx

'use client';
import { useState, useEffect } from 'react';
import init, { WasmModule } from '../../../pkg/wasm_rust_testings';

const Page = () => {
  const [addResult, setAddResult] = useState<BigInt | null>(null);
  const [mathResult, setMathResult] = useState<BigInt | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [jsTimeTaken, setJSTimeTaken] = useState<number | null>(null);

  useEffect(() => {
    const runWasm = async () => {
      try {
        // initialize Web Assembly
        console.log('Initializing Web Assembly');
        const wasmMod: WasmModule = await init();

        // call the add function
        const addResult = wasmMod.add(10, 40);
        console.log(`addResult: ${addResult}`);
        setAddResult(addResult)

        // wasm for the for loop
        const startTime = performance.now();
        const mathCompute = wasmMod.compute_math(BigInt(0));
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        setTimeTaken(elapsedTime);
        console.log(`Time taken is ${elapsedTime}`);

        // JavaScript for the for loop
        const jsStartTime = performance.now();
        let a = 0;
        for (let i = 0; i < 1000000000; i++) {
          a += i * i;
        }
        let b = 0;
        for (let i = 0; i < 1000000000; i++) {
          b += i * i;
        }
        let c = 0;
        for (let i = 0; i < 1000000000; i++) {
          c += i * i;
        }

        const jsMathResult = a + b - c;
        const jsEndTime = performance.now();
        const jsElapsedTime = jsEndTime - jsStartTime;
        setJSTimeTaken(jsElapsedTime);

        // Update the state with the mathCompute result
        setMathResult(mathCompute);
      } catch (error) {
        console.error('Error initializing Web Assembly:', error);
      }
    };

    runWasm();
  }, []); // Run once on component mount

  return (
    <div>
      <p>Your page content goes here</p>
      {addResult !== null && (
        <p>
          Add result: {addResult.toString()}
        </p>
      )}
      {mathResult !== null && (
        <p>
          Math result: {mathResult.toString()}
        </p>
      )}
      {timeTaken !== null && (
        <p>
          Time taken result: {timeTaken.toString()}
        </p>
      )}
      {jsTimeTaken !== null && (
        <p>
          Time taken result: {jsTimeTaken.toString()}
        </p>
      )}
    </div>
  );
};

export default Page;
