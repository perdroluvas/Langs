#include <stdio.h>
#include <stdlib.h>

int main(void) {
  int n = 7;
  int x = 10;

  // Allocate memory for `n` integers
    int *arr = (int *)calloc(n, sizeof(int));
  if (!arr) {
    fprintf(stderr, "Failed to allocate memory.\n");
    return 1;
  }

  // Initialize and print
  for (int i = 0; i < n; i++) {
    arr[i] = i * 10;
    printf("arr[%d] = %d\n", i, arr[i]);
  }
  //Free arr
  free(arr);
  arr = NULL; 
  //Sempre que liberar um espaço de memória, iguale a NULL para evitar UNDEFINED BEHAVIOR!!!
  int *vetor = (int *)calloc(x, sizeof(int));
  if (!vetor){
    fprintf(stderr,"failed to allocate\n");
    return 1;
  }
  for (int a = 0; a < x; a++) {
    vetor[a] = a * 10;
    printf("vetor[%d] = %d\n", a, vetor[a]);
  }
  //Free vetor
  free(vetor);
  
  return 0;
}

