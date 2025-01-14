// Invocação de uma syscall (em C)
//gcc -o hello hello.c
#include <stdlib.h>
#include <unistd.h>

int main (int argc, char *argv[])
{
write (1, "Hello World!\n", 13) ; /* write string to stdout */
exit (0) ; /* exit with no error */
}
