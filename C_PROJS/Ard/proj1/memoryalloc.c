#include <stdio.h>
#include <stdlib.h>

// TODO: Create your node structure here
struct Node {
    int data;
    struct Node* next;
};

// Function prototypes
// TODO: Complete these function declarations
struct Node* createNode(/* what parameters do you need? */);
struct Node* insertNode(/* what parameters do you need? */);
struct Node* displayList(/* what parameters do you need? */);
struct Node* freeList(/* what parameters do you need? */);
struct Node* printArray();


int main() {
    // TODO: Declare your head pointer
    // TODO: Initialize your list
    int array[] = {1, 2, 3, 4, 5};
    //int* ptr = array;
    /*
    printf("Pointer arithmetic demonstration:\n");
    printf("First element: %d\n", *ptr);        // 1
    printf("Second element: %d\n", *(ptr + 1)); // 2
    printf("Third element: %d\n", *(ptr + 2));  // 3
    printf("After moving pointer forward 2 positions: %d\n", *ptr); // 3
    */

    createNode(6);
    printArray(6);

    // TODO: Add some nodes

    // TODO: Display the list

    // TODO: Free the memory

    return 0;
}

struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!");
        return NULL;
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}


struct Node* printArray(int array[], int size) {
    printf("Conteúdo da array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");
}

struct Node* insertNode(){
    printf("Inseriu node!");
}

struct Node* displayList(){
    printf("Mostrando a lista");
}

struct Node*freeList(){
    printf("lista vazia mano!");
}
