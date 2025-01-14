#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    // Alocando espaço para 5 inteiros
    int *arr = malloc(n * sizeof(int));
    if (!arr) {
        fprintf(stderr, "Failed to allocate memory.\n");
        return 1;
    }

    // Preenchendo o array com valores de 0 a 4
    for (int i = 0; i < n; i++) {
        arr[i] = i; 
        // Exemplo de saída: arr[0] = 0, arr[1] = 1, ...
        printf("Enchendo o array! número: %d\n", arr[i]);
    }

    // Agora vamos "aumentar" o tamanho do array de 5 para 10 inteiros
    n = 10;
    // realloc tenta realocar o array para caber 10 inteiros
    int *new_arr = realloc(arr, n * sizeof(int));
    if (!new_arr) {
        fprintf(stderr, "Failed to reallocate memory.\n");
        // Em caso de falha, ainda precisamos liberar a memória antiga
        free(arr);
        return 1;
    }

    // Se realloc funcionar, 'new_arr' agora aponta para um bloco com 10 inteiros
    // Importante: arr ainda é um ponteiro antigo, então fazemos:
    arr = new_arr; 
    // A partir deste momento, arr e new_arr apontam para o MESMO bloco de memória

    // Tentativa de imprimir o conteúdo nos índices de 2 a 9 (alguns valores podem ser lixo ou 0)
    // Em muitos sistemas, a área nova pode aparecer zerada, mas não é garantido pela linguagem.
    for (int x = 2; x < n; x++) {
        printf("Elemento %d (inicialmente pode estar 'zerado' ou lixo): %d\n", x, new_arr[x]);
    }

    // Preenchemos as novas posições [5..9] com valores correspondentes
    for (int i = 5; i < n; i++) {
        new_arr[i] = i; 
        // Agora sim garantimos que índice 5..9 tenham valores 5..9
        printf("Enchendo o array na nova região: %d\n", new_arr[i]);
    }

    // Verificando todos os 10 valores no new_arr
    for (int i = 0; i < n; i++) {
        printf("Elementos dentro de new_arr número: %d\n", new_arr[i]);
    }
    printf("\n");

    // Imprimindo um valor específico (apenas como teste)
    printf("%d ", arr[6]); 

    // Novamente, como arr = new_arr, ele tem os mesmos valores
    for (int i = 0; i < n; i++) {
        printf("Elementos dentro de arr número: %d\n", arr[i]);
    }
    printf("\n");

    // Liberando a memória final
    free(arr);
    return 0;

/*
    Representação final (ilustrativa, seguindo a ideia do seu comentário):

      arr (antes do realloc):          |1|2|3|4|5|
      
      new_arr após ser criado 
      (podendo mostrar zeros ou lixo): |1|2|3|4|5|0|0|0|0|0|
      
      new_arr após preencher (índices 5..9): 
                                       |1|2|3|4|5|6|7|8|9|10|

    OBS: Os zeros nos índices 5..9 antes do "preenchimento" são um efeito comum
    de como o sistema operacional/allocator está fornecendo a memória, mas não
    é um comportamento obrigatório da linguagem C (poderia ser lixo de memória).
*/
}

