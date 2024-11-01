import numpy as np
import matplotlib.pyplot as plt

# Parametrização do caminho γ(t) = t^2 + it
t = np.linspace(0, 1, 100)
x = t**2  # Parte real
y = t     # Parte imaginária

# Criar o gráfico
plt.figure(figsize=(8, 6))
plt.plot(x, y, label=r'$\gamma(t) = t^2 + it$', color='blue')
plt.scatter([0, 1], [0, 1], color='red')  # Ponto inicial e final
plt.text(0, 0, '(0, 0)', fontsize=12, verticalalignment='bottom', horizontalalignment='right')
plt.text(1, 1, '(1, 1)', fontsize=12, verticalalignment='bottom', horizontalalignment='left')

# Configurações do gráfico
plt.title('Caminho de Integração')
plt.xlabel('Parte Real')
plt.ylabel('Parte Imaginária')
plt.axhline(0, color='black',linewidth=0.5, ls='--')
plt.axvline(0, color='black',linewidth=0.5, ls='--')
plt.grid(color = 'gray', linestyle = '--', linewidth = 0.5)
plt.legend()
plt.xlim(-0.1, 1.1)
plt.ylim(-0.1, 1.1)
plt.gca().set_aspect('equal', adjustable='box')
plt.show()
