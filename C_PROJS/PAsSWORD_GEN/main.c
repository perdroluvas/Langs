#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
/*TODO: ADICIONAR MAIS OPÇOES: 
 * 1: NUMEROS 
 * 2: LETRAS 
 * 3: LETRAS E NUMEROS
 * 4: ASCII
 * 5: CORES
*/

struct Color {
        int r;
        int g;
        int b;
        const char* name;
    };

    struct Color rainbow[] = {
        {255, 0, 0, "Vermelho"},    // Red
        {255, 127, 0, "Laranja"},   // Orange
        {255, 255, 0, "Amarelo"},   // Yellow
        {0, 255, 0, "Verde"},       // Green
        {0, 0, 255, "Azul"},        // Blue
        {75, 0, 130, "Indigo"},     // Indigo
        {148, 0, 211, "Violeta"}    // Violet
    };


void ranrandom(int scope, int option) {
  srand(time(NULL));
  int numero = 0;
  switch (option) {
    case 1: //numeros
    for (int i = 0; i < scope; i++) {
      numero = (rand() % 10) + 1;
        printf("%d", numero);
      }
    break;
    case 2: //letras
    char letras[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*_";
    for (int i = 0; i < scope; i++) {
      int randomIndex = rand() % strlen(letras);
      printf("%c", letras[randomIndex]);
    }
    break;
    case 3:          //LETRAS E NUMEROS
    char letras_numeros[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*_1234567890";
    for (int i = 0; i < scope; i++) {
       int randomIndex = rand() % strlen(letras_numeros);
       printf("%c", letras_numeros[randomIndex]); 
    }
    break;

    case 4:          //ASCII TODO
    char password[11];
    for(int i = 0; i < scope; i++) {
        password[i] = (rand() % 94) + 33;  
    }
    password[10] = '\0';
    printf("Example Password: %s\n", password);
    break;

    case 5:          //CORES
    
    printf("Cores do arco-íris em RGB aleatorias:\n");
    for(int i = 0; i < 7; i++) {
        int aleatore = (rand() % 7);
        printf("%s: RGB(%d, %d, %d)\n", 
            rainbow[aleatore].name, 
            rainbow[aleatore].r, 
            rainbow[aleatore].g, 
            rainbow[aleatore].b);
    }
    break;
  }
}

int main(int argc, char *argv[]) {
  int escolha = 0;
  int Failed = 0;
  bool verifier;
  printf("Hello mundo!\n");
  printf("Fazer um projeto em C para praticar minhas skills!\n");
  printf("**********************************************\n");
  printf("|           PAsSWORD GENERATOR V 0.01        |\n");
  printf("**********************************************\n");
  printf("Selecione uma das 5 opções:\n");
  printf("1 ------------ Numeros aleatorios\n");
  printf("2 ------------ Letras aleatorias\n");
  printf("3 ------------ Letras e números\n");
  printf("4 ------------ ASCII\n");
  printf("5 ------------ Cores\n");

  while (Failed == 0) {
    if (scanf("%d", &escolha) != 1) {
      printf("Invalid input!!!\n");
      Failed = 1;
      scanf("%*s");
    } else {
      Failed = 0;

      if (escolha == 1) {
        ranrandom(10, 1);
      } else if (escolha == 2) {
        ranrandom(10, 2);
      } else if (escolha == 3) {
        ranrandom(10, 3);
      } else if (escolha == 4) {
        ranrandom(10, 4);
      } else if (escolha == 5) {
        ranrandom(10, 5);     
      }

      return 0;
    }
  }
}
