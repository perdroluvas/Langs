#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function to return either "Hello, [name]!" or "Hello there!" based on the input
char *say_hello(const char *name) {
    // Check if the name is NULL or an empty string
    if (name == NULL || strlen(name) == 0) {
        // Allocate memory for "Hello there!" and return it
        char *greeting = malloc(16 * sizeof(char));  // 12 characters for "Hello there!"
        if (greeting != NULL) {
            strcpy(greeting, "Hello there!");
        }
        return greeting;
    } else {
        // Calculate memory needed for "Hello, " + name + "!"
        size_t greeting_length = strlen("Hello, ") + strlen(name) + 1 + 1;  // +1 for '!' and +1 for '\0'
        char *greeting = malloc(greeting_length * sizeof(char));
        if (greeting != NULL) {
            // Format the greeting string
            sprintf(greeting, "Hello, %s!", name);
        }
        return greeting;
    }
}

int main() {
    // Test cases
    char *greeting1 = say_hello("Alice");
    printf("%s\n", greeting1);
    free(greeting1);

    char *greeting2 = say_hello("");
    printf("%s\n", greeting2);
    free(greeting2);

    char *greeting3 = say_hello(NULL);
    printf("%s\n", greeting3);
    free(greeting3);

    return 0;
}

