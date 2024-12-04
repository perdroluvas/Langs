#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int count_words(FILE *file) {
  char c;
    char c;
    int in_word = 0;
    int word_count = 0;
    char *p = &c;

    // Read each character in the file
    while ((*p = fgetc(file)) != EOF) {
        // Check if the character is a letter or digit
        if (isalnum(*p)) {
            if (!in_word) {
                in_word = 1;  // We are entering a new word
                word_count++;
            }
        } else {
            in_word = 0;  // End of a word
        }
    }

    return word_count;
}

int main() {
    FILE *file;
    char filename[100];

    printf("Enter the filename: ");
    scanf("%s", filename);

    // Open the file for reading
    file = fopen(filename, "r");
    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    int word_count = count_words(file);
    printf("The file contains %d words.\n", word_count);

    fclose(file);
    return 0;
}

