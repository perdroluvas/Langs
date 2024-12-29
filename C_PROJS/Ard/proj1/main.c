#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure example for dynamic memory allocation
typedef struct {
  char* name;
  int age;
} Person;

// Function prototypes
Person* createPerson(const char* name, int age);
void freePerson(Person* person);
int* createDynamicArray(int size);
void demonstrateMemoryLeak();
void demonstratePointerArithmetic();
void pointerSum();

int main(int argc, char *argv[]) {
  // 1. Basic malloc and free example
  int* pointer = (int*)malloc(sizeof(int));
  int* number = (int*)malloc(sizeof(int));
  if (number == NULL) {
    printf("Memory allocation failed!\n");
    printf("moooo shiteiruuuuuuu");
    return EXIT_SUCCESS;

  }

  pointerSum();

  *number = 42;
  *pointer = 12.0;
  printf("Dynamically allocated number: %d\n", *number);

  free(pointer);
  free(number); // Always free allocated memory when done

  // 2. Dynamic array allocation
  int size = 5;
  int* dynamicArray = createDynamicArray(size);
  if (dynamicArray) {
    for (int i = 0; i < size; i++) {
      dynamicArray[i] = i * 2;
      printf("dynamicArray[%d] = %d\n", i, dynamicArray[i]);
    }
    free(dynamicArray);
  }

  // 3. Structure with dynamic memory
  Person* person = createPerson("John Doe", 30);
  if (person) {
    printf("Person: %s, Age: %d\n", person->name, person->age);
    freePerson(person);
  }

  // 4. Demonstrate pointer arithmetic
  demonstratePointerArithmetic();

  // 5. Calloc example (initializes memory to zero)
  int* zeroArray = (int*)calloc(5, sizeof(int));
  if (zeroArray) {
    printf("Calloc initialized values: ");
    for (int i = 0; i < 5; i++) {
      printf("%d ", zeroArray[i]);
    }
    printf("\n");
    free(zeroArray);
  }

  // 6. Realloc example
  int* array = (int*)malloc(3 * sizeof(int));
  if (array) {
    array[0] = 1; array[1] = 2; array[2] = 3;

    // Resize array to hold 5 elements
    int* resizedArray = (int*)realloc(array, 5 * sizeof(int));
    if (resizedArray) {
      array = resizedArray;
      array[3] = 4;
      array[4] = 5;

      printf("Resized array: ");
      for (int i = 0; i < 5; i++) {
        printf("%d ", array[i]);
      }
      printf("\n");
      free(array);
    }
  }

  return EXIT_SUCCESS;
}

// Function to create a dynamic array
int* createDynamicArray(int size) {
  return (int*)malloc(size * sizeof(int));
}

// Function to create a Person structure with dynamic name
Person* createPerson(const char* name, int age) {
  Person* person = (Person*)malloc(sizeof(Person));
  if (person) {
    person->name = (char*)malloc(strlen(name) + 1); // +1 for null terminator
    if (person->name) {
      strcpy(person->name, name);
      person->age = age;
    } else {
      free(person);
      return NULL;
    }
  }
  return person;
}

// Function to properly free a Person structure
void freePerson(Person* person) {
  if (person) {
    free(person->name); // Free the dynamically allocated name first
    free(person);       // Then free the structure itself
  }
}

// Function to demonstrate pointer arithmetic
void demonstratePointerArithmetic() {
  int array[] = {1, 2, 3, 4, 5};
  int* ptr = array;

  printf("Pointer arithmetic demonstration:\n");
  printf("First element: %d\n", *ptr);        // 1
  printf("Second element: %d\n", *(ptr + 1)); // 2
  printf("Third element: %d\n", *(ptr + 2));  // 3

  // Moving pointer forward
  ptr += 2;
  printf("After moving pointer forward 2 positions: %d\n", *ptr); // 3

}

void pointerSum() {
  int array[] = {5,4,3,2,1};
  int* ptr = array;
  int sum = 0;
  char result[20];
  char* strPtr = result;

  //Soma usando aritmetica de ponteiros
  while (ptr < array + 5) {
    sum += *ptr;
    ptr++;
  }

  sprintf(result, "%d", sum);

  //exibe os resultados apos conversão pelo sprintf
  //acho que entendi como isso aqui funciona!

  printf("Soma como numero: %d\n", sum);
  printf("Soma como string: %s\n", strPtr);

}


// WARNING: This function demonstrates a memory leak - don't do this in real code!
void demonstrateMemoryLeak() {
  int* leakedMemory = (int*)malloc(sizeof(int));
  *leakedMemory = 42;
  // Memory is not freed - this is a memory leak!
  // Proper code should include: free(leakedMemory);
}
