import GHC.IO.Exception (unsupportedOperation)
-- Fun��o que retorna "LUCKY NUMBER SEVEN!" se o argumento for 7, caso contr�rio retorna "Sorry, you're out of luck, pal!"
lucky :: (Integral a) => a -> String
lucky 7 = "LUCKY NUMBER SEVEN!"
lucky x = "Sorry, you're out of luck, pal!"

-- Fun��o que retorna uma string correspondente ao n�mero passado como argumento (de 1 a 5), caso o n�mero n�o esteja neste intervalo, retorna "Not between 1 and 5"
sayMe :: (Integral a) => a -> String
sayMe 1 = "One!"
sayMe 2 = "Two!"
sayMe 3 = "Three!"
sayMe 4 = "Four!"
sayMe 5 = "Five!"
sayMe x = "Not between 1 and 5"

-- Fun��o que calcula o fatorial de um n�mero
factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Fun��o que retorna o nome correspondente ao caractere passado como argumento, caso n�o haja correspond�ncia, retorna "NO MORE"
charName :: Char -> String
charName 'a' = "Albert"
charName 'b' = "Broseph"
charName 'c' = "Cecil"
charName x = "NO MORE"

-- Fun��es que retornam o primeiro, segundo e terceiro elementos de uma tupla de 3 elementos, respectivamente
first :: (a, b, c) -> a
first (x, _, _) = x

second :: (a, b, c) -> b
second (_, y, _) = y

third :: (a, b, c) -> c
third (_, _, z) = z

-- Fun��o que calcula a soma dos n�meros de 1 at� o argumento passado
soma :: Int -> Int
soma x = sum [1..x]

-- Fun��o que soma dois vetores de 2 dimens�es
addVectors :: (Num a) => (a,a) -> (a,a) -> (a,a)
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)

-- Fun��o que ordena uma lista de pares (Int, String) em ordem decrescente pelo primeiro elemento de cada par
binarioOrdem :: [(Int, String)] -> [(Int, String)]
binarioOrdem [] = []
binarioOrdem [x] = [x]
binarioOrdem (x:y:xs)
    | fst x > fst y = x : binarioOrdem (y:xs)
    | otherwise = y : binarioOrdem (x:xs)

-- Func que calcula o comprimento de uma lista alternativa � fun��o padr�o length
length' :: (Num b) => [a] -> b
length' [] = 0
length' (_:xs) = 1 + length' xs

-- Func que retorna uma string descrevendo o conte�do de uma lista, dependendo de sua quantidade de elementos
tell :: (Show a) => [a] -> String
tell [] = "The list is empty"
tell (x:[]) = "The list has one element: " ++ show x
tell (x:y:[]) = "The list has two elements: " ++ show x ++ " and " ++ show y
tell (x:y:_) = "This list is long. The first two elements are: " ++ show x ++ " and " ++ show y

-- Func que calcula a soma de todos os elementos de uma lista
sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs

-- Func que retorna a primeira letra de uma string em mai�scula, ou uma mensagem de erro se a string estiver vazia
capital :: String -> String
capital "" = "Empty string, whoops!"
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]

-- Func que compara dois valores e retorna o resultado da compara��o (GT, EQ ou LT)
myCompare :: (Ord a) => a -> a -> Ordering
a `myCompare` b
    | a > b     = GT
    | a == b    = EQ
    | otherwise = LT

-- Exemplo de where binding: fun��o que recebe a massa e o volume de um objeto e retorna uma mensagem com a densidade e uma descri��o do objeto
densityTell :: (RealFloat a) => a -> a -> String
densityTell mass volume
    | density < air = "Wow! You're going for a ride in the sky!"
    | density <= water = "Have fun swimming, but watch out for sharks!"
    | otherwise   = "If it's sink or swim, you're going to sink."
    where density = mass / volume
          air = 1.2
          water = 1000.0

-- Exemplo de where binding: fun��o que recebe o nome e sobrenome de uma pessoa e retorna as iniciais
initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
    where (f:_) = firstname
          (l:_) = lastname

cylinder :: (RealFloat a) => a -> a -> a
cylinder r h =
    let sideArea = 2*pi*r*h
        topArea = pi* r^2
    in sideArea + 2 * topArea

mCalc operation 
    | operation == 1 = a * b
    | operation == 2 = a + b 
    | operation == 3 = a / b 
    | operation == 4 = a - b 
    where a = 3 
          b = 4

-- IGUAIS

heade' :: [a] -> a 
heade' [] = error "No heade empteee"
heade' (x:_) = x

head' :: [a] -> a  
head' xs = case xs of [] -> error "No head for empty lists!"  
                      (x:_) -> x  
