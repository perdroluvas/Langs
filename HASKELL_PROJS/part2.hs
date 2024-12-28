{- |
=================================================
    HASKELL PATTERN MATCHING E GUARDS AVANÇADOS
=================================================

Este módulo contém exemplos avançados de pattern matching,
guards e expressões case em Haskell.
-}

import GHC.IO.Exception (unsupportedOperation)

-- |===========================================|
-- | 1. PATTERN MATCHING BÁSICO               |
-- |===========================================|

-- | Exemplo simples de pattern matching com número
lucky :: (Integral a) => a -> String
lucky 7 = "LUCKY NUMBER SEVEN!"
lucky x = "Sorry, you're out of luck, pal!"

-- | Pattern matching com múltiplos casos
sayMe :: (Integral a) => a -> String
sayMe 1 = "One!"
sayMe 2 = "Two!"
sayMe 3 = "Three!"
sayMe 4 = "Four!"
sayMe 5 = "Five!"
sayMe 6 = "Six!"
sayMe x = "Not between 1 and 6"

-- | Pattern matching com caracteres
charName :: Char -> String
charName 'a' = "Albert"
charName 'b' = "Broseph"
charName 'c' = "Cecil"
charName x = "NO MORE"

-- |===========================================|
-- | 2. PATTERN MATCHING COM TUPLAS           |
-- |===========================================|

-- | Extrai primeiro elemento de uma tripla
first :: (a, b, c) -> a
first (x, _, _) = x

-- | Extrai segundo elemento de uma tripla
second :: (a, b, c) -> b
second (_, y, _) = y

-- | Extrai terceiro elemento de uma tripla
third :: (a, b, c) -> c
third (_, _, z) = z

-- | Soma vetores usando pattern matching
addVectors :: (Num a) => (a,a) -> (a,a) -> (a,a)
addVectors (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)

-- |===========================================|
-- | 3. PATTERN MATCHING COM LISTAS           |
-- |===========================================|

-- | Ordenação binária usando pattern matching
binarioOrdem :: [(Int, String)] -> [(Int, String)]
binarioOrdem [] = []
binarioOrdem [x] = [x]
binarioOrdem (x:y:xs)
    | fst x > fst y = x : binarioOrdem (y:xs)
    | otherwise = y : binarioOrdem (x:xs)

-- | Implementação própria de length
length' :: (Num b) => [a] -> b
length' [] = 0
length' (_:xs) = 1 + length' xs

-- | Descrição do tamanho da lista
tell :: (Show a) => [a] -> String
tell [] = "The list is empty"
tell (x:[]) = "The list has one element: " ++ show x
tell (x:y:[]) = "The list has two elements: " ++ show x ++ " and " ++ show y
tell (x:y:_) = "This list is long. The first two elements are: " ++ show x ++ " and " ++ show y

-- | Soma elementos de uma lista recursivamente
sum' :: (Num a) => [a] -> a
sum' [] = 0
sum' (x:xs) = x + sum' xs

-- |===========================================|
-- | 4. PATTERN MATCHING COM AS-PATTERNS      |
-- |===========================================|

-- | Exemplo de as-pattern (@)
capital :: String -> String
capital "" = "Empty string, whoops!"
capital all@(x:xs) = "The first letter of " ++ all ++ " is " ++ [x]

-- |===========================================|
-- | 5. GUARDS                                |
-- |===========================================|

-- | Comparação usando guards
myCompare :: (Ord a) => a -> a -> Ordering
a `myCompare` b
    | a > b     = GT
    | a == b    = EQ
    | otherwise = LT

-- | Cálculo de densidade com guards e where
densityTell :: (RealFloat a) => a -> a -> String
densityTell mass volume
    | density < air = "Wow! You're going for a ride in the sky!"
    | density <= water = "Have fun swimming, but watch out for sharks!"
    | otherwise   = "If it's sink or swim, you're going to sink."
    where density = mass / volume
          air = 1.2
          water = 1000.0

-- |===========================================|
-- | 6. WHERE E LET BINDINGS                  |
-- |===========================================|

-- | Uso de where para extrair iniciais
initials :: String -> String -> String
initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
    where (f:_) = firstname
          (l:_) = lastname

-- | Cálculo de cilindro usando let
cylinder :: (RealFloat a) => a -> a -> a
cylinder r h =
    let sideArea = 2 * pi * r * h
        topArea = pi * r^2
    in sideArea + 2 * topArea

-- | Calculadora simples usando where
mCalc :: Int -> Double
mCalc operation 
    | operation == 1 = a * b
    | operation == 2 = a + b 
    | operation == 3 = a / b 
    | operation == 4 = a - b 
    where a = 3 
          b = 4

-- |===========================================|
-- | 7. CASE EXPRESSIONS                      |
-- |===========================================|

-- | Implementação de head com pattern matching direto
heade' :: [a] -> a 
heade' [] = error "No heade empteee"
heade' (x:_) = x

-- | Implementação de head usando case
head' :: [a] -> a  
head' xs = case xs of 
    [] -> error "No head for empty lists!"  
    (x:_) -> x

-- Exemplos adicionais úteis:

-- | Pattern matching com Maybe
safeDiv :: Integral a => a -> a -> Maybe a
safeDiv _ 0 = Nothing
safeDiv x y = Just (x `div` y)

-- | Pattern matching com tipos customizados
data Point = Point Float Float deriving (Show)
data Shape = Circle Point Float | Rectangle Point Point deriving (Show)

area :: Shape -> Float
area (Circle _ r) = pi * r ^ 2
area (Rectangle (Point x1 y1) (Point x2 y2)) = abs (x2 - x1) * abs (y2 - y1)

-- | Guards com pattern matching combinados
whatAge :: Int -> String
whatAge age 
    | age < 0 = "Você ainda não nasceu?"
    | age < 18 = "Você é menor de idade"
    | age < 60 = "Você é adulto"
    | otherwise = "Você é idoso"

-- | List comprehension com pattern matching
pairs :: [(Int, Int)]
pairs = [(x, y) | x <- [1..3], y <- [1..3], x <= y]

-- | Função recursiva com pattern matching e acumulador
factorial :: (Integral a) => a -> a
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- | Soma valores de 1 até x
soma :: Int -> Int
soma x = sum [1..x]
