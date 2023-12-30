use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b:i32) -> i32 {
    return a + b;
}


#[wasm_bindgen]
pub fn compute_math(mut a: i64) -> i64{
    for i in 0..100000000{
        a += i;
    }

    return a;
}



