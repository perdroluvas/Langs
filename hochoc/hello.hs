-- |=========================================|
-- | FUNÇÕES BÁSICAS E OPERAÇÕES MATEMÁTICAS |
-- |=========================================|


doubleUs :: Num a => a -> a -> a
doubleUs x y = x*2 + y*2


doubleMe :: Num a => a -> a
doubleMe x = x + x


doubleSmallNumber :: (Ord a, Num a) => a -> a
doubleSmallNumber x = if x > 100
    then x
    else x*2


doubleSmallNumber' :: (Ord a, Num a) => a -> a
doubleSmallNumber' x = (if x > 100 then x else x*2) + 1


addThree :: Num a => a -> a -> a -> a
addThree x y z = x + y + z

-- |=======================|
-- | FATORIAIS E NÚMEROS  |
-- |=======================|

-- Factorial usando Integer (números muito grandes)
factorial :: Integer -> Integer
factorial n = product [1..n]

-- Factorial usando Int (números menores)
factorial2 :: Int -> Int
factorial2 m = product [1..m]

-- Exemplo de factorial recursivo
factorialRec :: (Eq p, Num p) => p -> p
factorialRec 0 = 1
factorialRec n = n * factorialRec (n - 1)

-- |=======================|
-- | GEOMETRIA E CÍRCULOS |
-- |=======================|

-- Circunferência usando Float
circumference :: Float -> Float
circumference r = 2 * pi * r

-- Circunferência usando Double (mais precisão)
circumference' :: Double -> Double
circumference' s = 2 * pi * s

-- Área do círculo
circleArea :: Double -> Double
circleArea r = pi * r * r

-- |=======================|
-- | LISTAS E OPERAÇÕES   |
-- |=======================|

-- Lista de números exemplo
lostNumbers :: [Int]
lostNumbers = [1,3,5,6,7,10,42]

-- Lista vazia aninhada (exemplo de tipo complexo)
emptyList :: [[[[[[[[[[[[a]]]]]]]]]]]]
emptyList = [[[[[[[[[[[]]]]]]]]]]]

-- Exemplos de operações com listas:
-- [1,2,3] ++ [3,4,6]  -- concatenação
-- 'A':"Alooo"         -- adicionar elemento no início
-- head [1,2,3]        -- primeiro elemento
-- tail [1,2,3]        -- todos exceto o primeiro
-- last [1,2,3]        -- último elemento
-- init [1,2,3]        -- todos exceto o último

-- |=======================|
-- |   LIST COMPREHENSION  |
-- |=======================|

-- Lista que gera "BOOM" ou "BANG" baseado em condições
boomBangs :: Integral a => [a] -> [String]
boomBangs xs = [if x < 10 then "BOOM!" else "BANG" | x <- xs, odd x]

-- Listas para gerar combinações
nouns :: [String]
nouns = ["hobo", "frog", "pope"]

adjectives :: [String]
adjectives = ["lazy", "grouchy", "scheming"]

-- Todas as combinações possíveis
combinations :: [String]
combinations = [adj ++ " " ++ noun | adj <- adjectives, noun <- nouns]


removeNonUppercase :: String -> String
removeNonUppercase st = [ c | c <- st, c elem ['A'..'Z']]  


length' :: Num a => [b] -> a
length' xs = sum[1 | _ <- xs]


rightTriangles :: [(Integer, Integer, Integer)]
rightTriangles = [ (a,b,c) | c <- [1..100], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2]


rightTrianglesWithPerimeter :: Integer -> [(Integer, Integer, Integer)]
rightTrianglesWithPerimeter p = [ (a,b,c) | c <- [1..p], b <- [1..c], a <- [1..b], 
    a^2 + b^2 == c^2,
    a + b + c == p]

-- |=======================|
-- |  EXEMPLOS DE PATTERN  |
-- |      MATCHING         |
-- |=======================|

-- Pattern matching com listas
head' :: [a] -> a
head' [] = error "Lista vazia!"
head' (x:_) = x

-- Pattern matching com tuplas
fst' :: (a,b) -> a
fst' (x,_) = x

-- |=======================|
-- | GUARDAS (GUARDS)     |
-- |=======================|


bmi :: (RealFloat a) => a -> String  
bmi bmi  
    | bmi <= 18.5 = "Abaixo do peso"  
    | bmi <= 25.0 = "Peso normal"  
    | bmi <= 30.0 = "Sobrepeso"  
    | otherwise   = "Obesidade"

-- |=======================|
-- | FUNÇÕES DE ORDEM    |
-- | SUPERIOR           |
-- |=======================|

-- Map exemplo
double :: Num a => [a] -> [a]
double = map (*2)

-- Filter exemplo
evenNumbers :: Integral a => [a] -> [a]
evenNumbers = filter even

-- Fold exemplo
sum' :: Num a => [a] -> a
sum' = foldl (+) 0
