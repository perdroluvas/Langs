;nasm -f elf64 -o hello.o hello.asm
;ld -o hello hello.o

section .data
msg db 'Hello World!', 0xA ;output string (0xA = "\n")
len equ 13 ; string size

section .text

global _start

_start:
mov rax, 1 ; syscall opcode (1: write)
mov rdi, 1 ; file descriptor (1: stdout)
mov rsi, msg ; data to write
mov rdx, len ; number of bytes to write
syscall ; make syscall

mov rax, 60 ; syscall opcode (60: _exit)
mov rdi, 0 ; exit status (0: no error)
syscall ; make syscall
