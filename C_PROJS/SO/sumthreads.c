#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define NUM_THREADS 4  // You can change this number

//------------------------------------------------------------------------------
// A structure to hold data that we want to pass to each thread
//------------------------------------------------------------------------------
typedef struct {
    int threadId;       // Logical ID for the thread
    int workUnits;      // Some "work" parameter (just for demonstration)
} threadData_t;

//------------------------------------------------------------------------------
// Global (shared) variables
//------------------------------------------------------------------------------
int globalCounter = 0;        // A counter that all threads will increment
pthread_mutex_t globalMutex;  // Mutex to protect the globalCounter

//------------------------------------------------------------------------------
// Thread function
// Receives a pointer to our threadData_t struct, so we can access thread info
//------------------------------------------------------------------------------
void *threadBody(void *arg) {
    // Convert the arg back to our struct
    threadData_t *myData = (threadData_t *)arg;

    printf("[Thread %d] Starting. Will do %d units of work.\n",
           myData->threadId,
           myData->workUnits);

    // Simulate some work (e.g., computations, file I/O, etc.)
    // Here, we just sleep for demonstration.
    sleep(myData->workUnits);

    // Use a mutex to safely update the global counter
    pthread_mutex_lock(&globalMutex);
    globalCounter++;
    pthread_mutex_unlock(&globalMutex);

    printf("[Thread %d] Finished. globalCounter now = %d\n",
           myData->threadId,
           globalCounter);

    // The thread is done; free any resources if needed
    pthread_exit(NULL);
}

//------------------------------------------------------------------------------
// Main function
//------------------------------------------------------------------------------
int main(int argc, char *argv[]) {
    pthread_t threads[NUM_THREADS];      // Array to hold thread identifiers
    threadData_t threadData[NUM_THREADS]; // Array of structs for each thread
    int status;

    // Initialize the mutex before creating threads
    if (pthread_mutex_init(&globalMutex, NULL) != 0) {
        perror("pthread_mutex_init");
        exit(EXIT_FAILURE);
    }

    // Create the threads
    for (int i = 0; i < NUM_THREADS; i++) {
        // Prepare the data for the thread
        threadData[i].threadId  = i;
        threadData[i].workUnits = i + 1; // Just an example (threads do increasing 'work')

        printf("[Main] Creating thread %d\n", i);

        // Create the thread and pass &threadData[i] as the argument
        status = pthread_create(
            &threads[i],
            NULL,            // Default thread attributes
            threadBody,      // The function each thread will execute
            (void *)&threadData[i] // Argument to pass to the function
        );

        if (status) {
            fprintf(stderr, "Error: pthread_create returned code %d\n", status);
            exit(EXIT_FAILURE);
        }
    }

    // Wait for all threads to finish
    for (int i = 0; i < NUM_THREADS; i++) {
        status = pthread_join(threads[i], NULL);
        if (status) {
            fprintf(stderr, "Error: pthread_join returned code %d\n", status);
            exit(EXIT_FAILURE);
        }
        printf("[Main] Thread %d has joined.\n", i);
    }

    // Destroy the mutex (clean up resources)
    if (pthread_mutex_destroy(&globalMutex) != 0) {
        perror("pthread_mutex_destroy");
        exit(EXIT_FAILURE);
    }

    // Final output
    printf("[Main] All threads finished. Final globalCounter = %d\n", globalCounter);
    printf("[Main] Exiting.\n");

    // Return success
    return 0;
}


