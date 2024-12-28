#include <stdio.h>
#include <stdlib.h>

// TODO: Create your node structure here
struct Node {
    int data;
    struct Node* next;
};

// Function prototypes
// TODO: Complete these function declarations
struct Node* createNode(int value);
struct Node* insertNode(struct Node* head, int value);
void displayList(struct Node* head);
void freeList(struct Node* head);


int main() {
    struct Node* head = NULL;
    head = createNode(8);
    insertNode(head, 2);
    displayList(head);
    insertNode(head, 12);


    // Modificar esta linha para mostrar o valor do nó
    printf("Valor do nó: %d\n", head->data);  // Use -> para acessar o campo data

    freeList(head);

    // Este printf pode causar problemas pois 'head' foi liberado
    // Melhor remover ou modificar para verificar se está nulo
    if (head == NULL) {
        printf("Lista está vazia\n");
    }

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


struct Node* insertNode(struct Node* head, int value) {
    // Primeiro, criar o novo nó
    struct Node* newNode = createNode(value);

    if (head == NULL) {
        // Se a lista está vazia, o novo nó se torna a cabeça
        return newNode;
    }

    // Se não está vazia, precisamos ir até o último nó
    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }

    // Agora current aponta para o último nó
    current->next = newNode;

    return head;
}

void displayList(struct Node* head) {
    struct Node* current = head;
    printf("Lista: ");
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
}

void freeList(struct Node* head){
    if (head == NULL) {

        printf("List is already empy!");
    }
    else {
        printf("Freeing...");
        free(head);
        head = NULL;
        printf("Freed.");
    }
}
