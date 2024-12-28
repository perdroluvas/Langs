{- |
=================================================
    HASKELL RECURSÃO E FUNÇÕES AVANÇADAS
=================================================

Este módulo contém implementações recursivas de funções
comuns e algoritmos importantes em Haskell.
-}

-- |===========================================|
-- | 1. FUNÇÕES RECURSIVAS BÁSICAS           |
-- |===========================================|

-- | Encontra o maior elemento em uma lista recursivamente
maximum' :: (Ord a) => [a] -> a  
maximum' [] = error "maximum of empty list"  
maximum' [x] = x  
maximum' (x:xs)  
    | x > maxTail = x  
    | otherwise = maxTail  
    where maxTail = maximum' xs  

-- | Replica um elemento n vezes em uma lista
replicate' :: (Num i, Ord i) => i -> a -> [a]  
replicate' n x  
    | n <= 0    = []  
    | otherwise = x:replicate' (n-1) x

-- |===========================================|
-- | 2. MANIPULAÇÃO DE LISTAS                |
-- |===========================================|

-- | Pega os primeiros n elementos de uma lista
take' :: (Num i, Ord i) => i -> [a] -> [a]  
take' n _  
    | n <= 0   = []  
take' _ []     = []  
take' n (x:xs) = x : take' (n-1) xs 

-- | Gera uma lista infinita repetindo um elemento
repeat' :: a -> [a]  
repeat' x = x:repeat' x 

-- | Combina duas listas em uma lista de tuplas
zip' :: [a] -> [b] -> [(a,b)]  
zip' _ [] = []  
zip' [] _ = []  
zip' (x:xs) (y:ys) = (x,y):zip' xs ys 

-- |===========================================|
-- | 3. ALGORITMOS DE ORDENAÇÃO              |
-- |===========================================|

-- | Implementação do QuickSort
quicksort :: (Ord a) => [a] -> [a]  
quicksort [] = []  
quicksort (x:xs) = 
    let smallerSorted = quicksort [a | a <- xs, a <= x]  
        biggerSorted = quicksort [a | a <- xs, a > x]  
    in  smallerSorted ++ [x] ++ biggerSorted 

-- |===========================================|
-- | 4. FUNÇÕES MATEMÁTICAS                  |
-- |===========================================|

-- | Função polinomial simples
oiii :: Num a => a -> a
oiii x = x^2 + x^3

-- Exemplos adicionais úteis:

-- | Implementação recursiva de reverse
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

-- | Merge sort implementation
mergeSort :: Ord a => [a] -> [a]
mergeSort [] = []
mergeSort [x] = [x]
mergeSort xs = merge (mergeSort left) (mergeSort right)
  where
    (left, right) = splitAt (length xs `div` 2) xs
    merge [] ys = ys
    merge xs [] = xs
    merge (x:xs) (y:ys)
      | x <= y    = x : merge xs (y:ys)
      | otherwise = y : merge (x:xs) ys

-- | Fibonacci com memoização usando where
fib :: Int -> Integer
fib n = fibs !! n
  where
    fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

-- | Função para verificar se uma lista é palíndromo
isPalindrome :: Eq a => [a] -> Bool
isPalindrome xs = xs == reverse xs

-- | Filter personalizado usando recursão
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ [] = []
filter' p (x:xs)
    | p x       = x : filter' p xs
    | otherwise = filter' p xs
