#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <string.h>

#define NUM_PROCS  4 

typedef struct {
  int procId;     
  int workUnits;  
} childData_t;

int sumproc(int workUnits) {
  int value = 0;
  int results[64];

  printf("CASE 0: sumproc\n\n");
  printf("[sumproc] Squaring numbers up to %d...\n", workUnits-1);
  for (int i = 0; i < workUnits; i++) {
    results[i] = i * i;
    value = results[i];
  }
  printf("[sumproc] Last squared value was %d\n", value);
  return value;
}

void stringProc(int workUnits) {
  printf("CASE 1: stringProc\n\n");
  printf("[stringProc] Generating a greeting string for %d iterations...\n", workUnits);

  char finalString[256] = "";
  for (int i = 1; i <= workUnits; i++) {
    char temp[32];
    snprintf(temp, sizeof(temp), "Hello %d! ", i);
    strncat(finalString, temp, sizeof(finalString) - strlen(finalString) - 1);
  }

  printf("[stringProc] Result: \"%s\"\n", finalString);
}

void vectorMapping(int workUnits) {
  printf("CASE 2: vectorMapping\n\n");
  printf("[vectorMapping] Mapping a vector of size %d\n", workUnits);

  if (workUnits > 64) workUnits = 64;

  int* array = (int*)malloc(sizeof(int) * workUnits);
  if (!array) {
    fprintf(stderr, "[vectorMapping] Memory allocation failed\n");
    return;
  }

  for (int i = 0; i < workUnits; i++) array[i] = i;
  for (int i = 0; i < workUnits; i++) array[i] = array[i] * array[i] + 1;

  printf("[vectorMapping] Mapped values = [ ");
  for (int i = 0; i < workUnits; i++) printf("%d ", array[i]);
  printf("]\n");

  free(array);
}

unsigned long long customProc(int number) {
  printf("CASE 3: customProc Factorial!\n\n");
  printf("[customProc] Computing factorial of %d\n", number);
  if (number < 0) {
    printf("[customProc] Factorial of a negative number is not defined.\n");
    return 0ULL;
  }
  unsigned long long fact = 1ULL;
  for (int i = 1; i <= number; i++) fact *= i;
  printf("[customProc] factorial(%d) = %llu\n", number, fact);
  return fact;
}

void doWork(childData_t *myData) {
  printf("[Process %d] Starting. Will do %d units of work.\n",
         myData->procId, myData->workUnits);

  switch (myData->procId % 4) {
    case 0: sumproc(myData->workUnits); break;
    case 1: stringProc(myData->workUnits); break;
    case 2: vectorMapping(myData->workUnits); break;
    case 3: customProc(myData->workUnits); break;
    default: sumproc(myData->workUnits); break;
  }

  printf("[Process %d] Finished.\n", myData->procId);
}

int main(int argc, char *argv[]) {
  printf("[Grandfather] PID: %d\n", getpid());

  pid_t father_pid = fork();
  if (father_pid < 0) {
    perror("fork");
    exit(EXIT_FAILURE);
  } else if (father_pid == 0) {
    // Father process
    printf("[Father] PID: %d, Parent PID: %d\n", getpid(), getppid());

    childData_t childData[NUM_PROCS];
    pid_t pids[NUM_PROCS];

    for (int i = 0; i < NUM_PROCS; i++) {
      childData[i].procId = i;
      childData[i].workUnits = i + 1;

      pids[i] = fork();
      if (pids[i] < 0) {
        perror("fork");
        exit(EXIT_FAILURE);
      } else if (pids[i] == 0) {
        // Child process (grandchild)
        doWork(&childData[i]);
        _exit(EXIT_SUCCESS);
      } else {
        printf("[Father] Created child %d with PID %d\n", i, pids[i]);
      }
    }

    // Father waits for all children
    for (int i = 0; i < NUM_PROCS; i++) {
      int status;
      pid_t w = waitpid(pids[i], &status, 0);
      if (w == -1) {
        perror("waitpid");
        exit(EXIT_FAILURE);
      }
      printf("[Father] Child %d (PID %d) exited\n", i, pids[i]);
    }

    printf("[Father] All children have finished. Exiting.\n");
    exit(EXIT_SUCCESS);
  } else {
    // Grandfather waits for father
    int status;
    waitpid(father_pid, &status, 0);
    printf("[Grandfather] Father process %d has exited. Exiting.\n", father_pid);
  }

  return 0;
}
