use std::{io::{self, stdin}, vec};

fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    let col1 = [1,2,3];
    let col2 = [4,5,6];
    let col3 = [7,8,9];
    
    let mut v: Vec<i32> = Vec::new();
    v.push(1);
    v.push(3);
    v.push(4);
    let stdin = io::stdin();
    stdin.read_line(&mut col1);
    println!("{stdin}");


    println!("LIFTOFF!!!");
    //matrix(col1, col2, col3);
}
