import socket

def scan_ports(target, ports):
    print(f"Scanning {target}...")
    open_ports = []
    
    for port in ports:
        try:
            # Create a socket and attempt to connect
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(1)  # Timeout for connection attempts
                result = s.connect_ex((target, port))
                if result == 0:  # Port is open
                    open_ports.append(port)
        except Exception as e:
            print(f"Error scanning port {port}: {e}")
    
    return open_ports

if __name__ == "__main__":
    target = input("Enter the target IP or hostname: ")
    ports = range(1, 1025)  # Scan the first 1024 ports
    
    open_ports = scan_ports(target, ports)
    
    if open_ports:
        print(f"Open ports on {target}: {', '.join(map(str, open_ports))}")
    else:
        print(f"No open ports found on {target}.")
