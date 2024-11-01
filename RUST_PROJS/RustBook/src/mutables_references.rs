fn main() {
    let mut s = String::from("hello");

    change(&mut s);
    println!("{s}");
    let mut a = String::from("hello");

    let r1 = &a; // no problem
    let r2 = &a; // no proble
    println!("{r1} e {r2}");
    let r3 = &mut a; //SEM PROBLEMA NENHUM, R1 E R2 JA FORAM UTILIZADOS E CHAMADOS PELO PRINTLN
    println!("{r3}");

}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
/*
fn main() {
    let s = String::from("hello");

    change(&s);
}
fn change(some_string: &String) {
    some_string.push_str(", world");//nao funciona pois REFERENCIAS SÃO IMUTAVEIS POR DEFAULT. SE
                                    //QUISERMOS DEIXAR MUTAVEL, &mut como acima.
}*/
