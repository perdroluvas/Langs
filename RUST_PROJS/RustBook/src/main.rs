fn main() {
    let s = String::from("Oiiii");
    let reference_to_something = dangle();
    println!("{reference_to_something}");
    println!("{s}");
}

fn dangle() -> String { // dangle returns a reference to a String

    let s = String::from("hello"); // s is a new String

    s // we return a reference to the String, s
} // Here, s goes out of scope, and is dropped. Its memory goes away.
  // Danger!
