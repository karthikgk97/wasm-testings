use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b:i32) -> i32 {
    return a + b;
}


#[wasm_bindgen]
pub fn compute_math(mut a: i64) -> i64{
    for i in 0..1000000000{
        a += i * i;
    }

    let mut b = 0;
    for i in 0..1000000000{
        b += i * i;
    }

    let mut c = 0;
    for i in 0..1000000000{
        c += i * i;
    }
    return a + b - c;
}



