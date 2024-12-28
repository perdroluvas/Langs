{- |
==================================
    GUIA DE FUNDAMENTOS HASKELL
==================================

Este arquivo contém exemplos fundamentais de Haskell organizados por tópicos.
Cada seção apresenta conceitos específicos com exemplos práticos.

Autor: Baseado no código original do estudante
Data: Atualizado com exemplos adicionais
-}

-- |===========================================|
-- | 1. FUNÇÕES BÁSICAS E OPERAÇÕES          |
-- |===========================================|

-- | Multiplica dois números por 2 e soma os resultados
doubleUs :: Num a => a -> a -> a
doubleUs x y = x*2 + y*2

-- | Duplica um número (implementação alternativa de doubleUs)
doubleMe :: Num a => a -> a
doubleMe x = x + x

-- | Duplica números apenas se forem menores ou iguais a 100
doubleSmallNumber :: (Ord a, Num a) => a -> a
doubleSmallNumber x = if x > 100
    then x
    else x*2

-- | Similar a doubleSmallNumber, mas adiciona 1 ao resultado
doubleSmallNumber' :: (Ord a, Num a) => a -> a
doubleSmallNumber' x = (if x > 100 then x else x*2) + 1

-- | Soma três números
addThree :: Num a => a -> a -> a -> a
addThree x y z = x + y + z

-- |===========================================|
-- | 2. FATORIAIS E RECURSÃO                 |
-- |===========================================|

-- | Calcula fatorial usando Integer (para números muito grandes)
factorial :: Integer -> Integer
factorial n = product [1..n]

-- | Calcula fatorial usando Int (para números menores)
factorial2 :: Int -> Int
factorial2 m = product [1..m]

-- | Implementação recursiva do fatorial
factorialRec :: (Eq p, Num p) => p -> p
factorialRec 0 = 1
factorialRec n = n * factorialRec (n - 1)

-- |===========================================|
-- | 3. GEOMETRIA E MATEMÁTICA               |
-- |===========================================|

-- | Calcula a circunferência usando Float
circumference :: Float -> Float
circumference r = 2 * pi * r

-- | Calcula a circunferência usando Double (maior precisão)
circumference' :: Double -> Double
circumference' s = 2 * pi * s

-- | Calcula a área do círculo
circleArea :: Double -> Double
circleArea r = pi * r * r

-- |===========================================|
-- | 4. LISTAS E OPERAÇÕES                   |
-- |===========================================|

-- | Lista de números exemplo
lostNumbers :: [Int]
lostNumbers = [1,3,5,6,7,10,42]

-- | Exemplo de lista vazia aninhada (demonstração de tipos complexos)
emptyList :: [[[[[[[[[[[[a]]]]]]]]]]]]
emptyList = [[[[[[[[[[[]]]]]]]]]]]

{- Operações comuns com listas:
   - (++) : concatenação
   - (:)  : cons (adicionar no início)
   - head : primeiro elemento
   - tail : todos exceto o primeiro
   - last : último elemento
   - init : todos exceto o último
-}

-- |===========================================|
-- | 5. LIST COMPREHENSION                    |
-- |===========================================|

-- | Gera "BOOM!" para números < 10 e "BANG" para os demais
boomBangs :: Integral a => [a] -> [String]
boomBangs xs = [if x < 10 then "BOOM!" else "BANG" | x <- xs, odd x]

-- | Listas para demonstrar combinações
nouns :: [String]
nouns = ["hobo", "frog", "pope"]

adjectives :: [String]
adjectives = ["lazy", "grouchy", "scheming"]

-- | Gera todas as combinações possíveis de adjetivos e substantivos
combinations :: [String]
combinations = [adj ++ " " ++ noun | adj <- adjectives, noun <- nouns]

-- | Remove caracteres não maiúsculos de uma string
removeNonUppercase :: String -> String
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]

-- | Implementação própria da função length usando list comprehension
length' :: Num a => [b] -> a
length' xs = sum[1 | _ <- xs]

-- | Encontra triângulos retângulos
rightTriangles :: [(Integer, Integer, Integer)]
rightTriangles = [ (a,b,c) | c <- [1..100], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2]

-- | Encontra triângulos retângulos com um perímetro específico
rightTrianglesWithPerimeter :: Integer -> [(Integer, Integer, Integer)]
rightTrianglesWithPerimeter p = [ (a,b,c) | c <- [1..p], b <- [1..c], a <- [1..b], 
    a^2 + b^2 == c^2,
    a + b + c == p]

-- |===========================================|
-- | 6. PATTERN MATCHING                      |
-- |===========================================|

-- | Implementação segura de head usando pattern matching
head' :: [a] -> a
head' [] = error "Lista vazia!"
head' (x:_) = x

-- | Implementação própria de fst usando pattern matching
fst' :: (a,b) -> a
fst' (x,_) = x

-- |===========================================|
-- | 7. GUARDAS (GUARDS)                      |
-- |===========================================|

-- | Calcula categoria de IMC usando guardas
bmi :: (RealFloat a) => a -> String  
bmi bmi  
    | bmi <= 18.5 = "Abaixo do peso"  
    | bmi <= 25.0 = "Peso normal"  
    | bmi <= 30.0 = "Sobrepeso"  
    | otherwise   = "Obesidade"

-- |===========================================|
-- | 8. FUNÇÕES DE ORDEM SUPERIOR            |
-- |===========================================|

-- | Duplica todos os elementos de uma lista usando map
double :: Num a => [a] -> [a]
double = map (*2)

-- | Filtra apenas os números pares de uma lista
evenNumbers :: Integral a => [a] -> [a]
evenNumbers = filter even

-- | Soma todos os elementos de uma lista usando fold
sum' :: Num a => [a] -> a
sum' = foldl (+) 0

-- Funções adicionais úteis para aprendizado:

-- | Função curry que aplica parcialmente argumentos
curry' :: ((a, b) -> c) -> a -> b -> c
curry' f x y = f (x, y)

-- | Função compose que compõe duas funções
compose :: (b -> c) -> (a -> b) -> a -> c
compose f g x = f (g x)

-- | Exemplo de função que usa Maybe para tratamento de erros
safeDivide :: (Integral a) => a -> a -> Maybe a
safeDivide _ 0 = Nothing
safeDivide x y = Just (x `div` y)
