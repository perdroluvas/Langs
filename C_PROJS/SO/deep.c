#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/mman.h>
#include <pthread.h>

#define NUM_THREADS 16

// Shared data structure for counter and mutex
typedef struct {
    int globalCounter;
    pthread_mutex_t globalMutex;
} shared_data_t;

// Data structure passed to each child process
typedef struct {
    int threadId;
    int workUnits;
    shared_data_t *shared_data;
} threadData_t;

void threadBody(void *arg) {
    threadData_t *myData = (threadData_t *)arg;

    printf("[Child %d] Starting. Will do %d units of work.\n",
           myData->threadId, myData->workUnits);

    sleep(myData->workUnits);

    // Lock the mutex before updating the shared counter
    pthread_mutex_lock(&myData->shared_data->globalMutex);
    myData->shared_data->globalCounter++;
    pthread_mutex_unlock(&myData->shared_data->globalMutex);

    printf("[Child %d] Finished. globalCounter now = %d\n",
           myData->threadId, myData->shared_data->globalCounter);

    exit(EXIT_SUCCESS);
}

int main(int argc char *argv[]) {
    threadData_t threadData[NUM_THREADS];
    pid_t children[NUM_THREADS];
    shared_data_t *shared_data;

    // Allocate shared memory for counter and mutex
    shared_data = mmap(NULL, sizeof(shared_data_t), PROT_READ | PROT_WRITE,
                       MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    if (shared_data == MAP_FAILED) {
        perror("mmap failed");
        exit(EXIT_FAILURE);
    }

    // Initialize process-shared mutex
    pthread_mutexattr_t mutex_attr;
    if (pthread_mutexattr_init(&mutex_attr) != 0) {
        perror("pthread_mutexattr_init");
        exit(EXIT_FAILURE);
    }
    if (pthread_mutexattr_setpshared(&mutex_attr, PTHREAD_PROCESS_SHARED) != 0) {
        perror("pthread_mutexattr_setpshared");
        exit(EXIT_FAILURE);
    }
    if (pthread_mutex_init(&shared_data->globalMutex, &mutex_attr) != 0) {
        perror("pthread_mutex_init");
        exit(EXIT_FAILURE);
    }
    pthread_mutexattr_destroy(&mutex_attr);

    shared_data->globalCounter = 0;

    // Create child processes
    for (int i = 0; i < NUM_THREADS; i++) {
        threadData[i].threadId = i;
        threadData[i].workUnits = i + 1;
        threadData[i].shared_data = shared_data;

        printf("[Main] Creating child %d\n", i);

        pid_t pid = fork();
        if (pid == -1) {
            perror("fork");
            exit(EXIT_FAILURE);
        } else if (pid == 0) {
            // Child process executes threadBody
            threadBody(&threadData[i]);
            // threadBody calls exit, so this code is unreachable
        } else {
            // Parent stores child PID
            children[i] = pid;
        }
    }

    // Wait for all child processes to finish
    for (int i = 0; i < NUM_THREADS; i++) {
        int status;
        if (waitpid(children[i], &status, 0) == -1) {
            perror("waitpid");
            exit(EXIT_FAILURE);
        }
        printf("[Main] Child %d exited with status %d\n", i, WEXITSTATUS(status));
    }

    // Cleanup: destroy mutex and unmap shared memory
    if (pthread_mutex_destroy(&shared_data->globalMutex) != 0) {
        perror("pthread_mutex_destroy");
        exit(EXIT_FAILURE);
    }
    if (munmap(shared_data, sizeof(shared_data_t)) == -1) {
        perror("munmap");
        exit(EXIT_FAILURE);
    }

    printf("[Main] All children finished. Final globalCounter = %d\n",
           shared_data->globalCounter);
    return 0;
}
