#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>

// Number of "workers" (previously threads, now processes).
#define NUM_PROCS  4  

//------------------------------------------------------------------------------
// A structure to hold data that we want to pass to each process
// (previously threadData_t).
//------------------------------------------------------------------------------
typedef struct {
  int procId;     // Logical ID for the "child"
  int workUnits;  // Some "work" parameter (just for demonstration)
} childData_t;

/**
 * Function that simulates the work each "child" (formerly thread) should do.
 */
void doWork(childData_t *myData) {
    printf("[Process %d] Starting. Will do %d units of work.\n",
           myData->procId, myData->workUnits);

    // Simulate some work by sleeping
    sleep(myData->workUnits);

    printf("[Process %d] Finished.\n", myData->procId);
}

int main(int argc, char *argv[]) {
    // We'll keep an array of childData to pass info (if needed) to each child.
    childData_t childData[NUM_PROCS];

    // We'll keep track of each child's PID so we can wait on them later.
    pid_t pids[NUM_PROCS];

    for (int i = 0; i < NUM_PROCS; i++) {
        // Prepare the data for the child
        childData[i].procId   = i;
        childData[i].workUnits = i + 1; // e.g., child i sleeps i+1 seconds

        printf("[Main] Forking child process %d\n", i);

        // Fork a new process
        pids[i] = fork();
        if (pids[i] < 0) {
            perror("fork");
            exit(EXIT_FAILURE);
        }
        else if (pids[i] == 0) {
            // ===== CHILD PROCESS =====
            // In the child, do the "threadBody"-like work
            doWork(&childData[i]);

            // IMPORTANT: We must _exit_ here so the child doesn't continue
            // back into the loop or run any parent code.
            _exit(EXIT_SUCCESS);
        }
        else {
            // ===== PARENT PROCESS =====
            // Just record the child's PID and continue
            printf("[Main] Created child with PID %d\n", pids[i]);
        }
    }

    // Wait for all child processes to finish
    for (int i = 0; i < NUM_PROCS; i++) {
        int status;
        pid_t w = waitpid(pids[i], &status, 0);
        if (w == -1) {
            perror("waitpid");
            exit(EXIT_FAILURE);
        }
        printf("[Main] Child process %d (PID %d) has exited.\n", i, pids[i]);
    }

    // Final output
    printf("[Main] All child processes finished. Exiting.\n");
    return 0;
}

