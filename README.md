# Trabajo Final - Talento Tech - NodeJS

Proyecto final del módulo de **Backend con Node.js** del programa **Talento Tech**.

## Descripción

Aplicación de **línea de comandos (CLI)** hecha con Node.js que permite gestionar productos consumiendo la API pública [FakeStore API](https://fakestoreapi.com/docs). Desde la terminal se pueden consultar todos los productos, consultar un producto puntual, crear uno nuevo y eliminar uno existente.

> **Nota:** FakeStore API es una API de prueba. Las operaciones `POST` y `DELETE` devuelven una respuesta simulada, pero no modifican datos reales.

## Tecnologías utilizadas

- **Node.js 18 o superior** (usa `fetch` nativo y `await` de nivel superior)
- **ESModules** (`"type": "module"` en `package.json`)
- **Sin dependencias externas**

## Instalación

1. Clonar el repositorio:

```bash
    git clone https://github.com/Bertolini-Victor/TrabajoFinal-TalentoTech-NodeJS-Bertolini-Victor.git
```

2.Entrar al directorio del proyecto:

```bash
    cd TrabajoFinal-TalentoTech-NodeJS-Bertolini-Victor
```

No hace falta ejecutar `npm install`, ya que el proyecto no tiene dependencias.

## Uso

Todos los comandos se ejecutan con el script `start`:

```bash
npm run start <MÉTODO> <recurso> [argumentos]
```

### Comandos disponibles

| Acción | Comando | Ejemplo |
| :--- | :--- | :--- |
| Listar todos los productos | `npm run start GET products` | `npm run start GET products` |
| Consultar un producto | `npm run start GET products/<productId>` | `npm run start GET products/15` |
| Crear un producto | `npm run start POST products <title> <price> <category>` | `npm run start POST products T-Shirt-Rex 300 remeras` |
| Eliminar un producto | `npm run start DELETE products/<productId>` | `npm run start DELETE products/7` |

### Ejemplo de salida

```bash
$ npm run start POST products T-Shirt-Rex 300 remeras

Producto creado con éxito:
{ title: 'T-Shirt-Rex', price: 300, category: 'remeras', id: 21 }
```

### Consideraciones

- Si el título tiene espacios, va entre comillas:

```bash
    npm run start POST products "Remera Rex" 300 remeras
```

El precio debe ser un número válido.

- El `productId` debe ser un número entero positivo.
- Si el comando está incompleto o no se reconoce, el programa muestra un mensaje de ayuda con el uso correcto.

## Manejo de errores

- **Validación de argumentos:** se controla que existan `title`, `price` y `category`, que el precio sea numérico y que el ID sea válido.
- **Errores de red o HTTP:** se capturan con `try/catch` y se muestra un mensaje claro en consola.
- **Producto inexistente:** la API responde vacío en lugar de un 404, por lo que el programa lo detecta e informa que no se encontró el producto.

## Estructura del proyecto

```text
.
├── index.js       # Lógica principal del CLI
├── package.json   # Configuración del proyecto y script start
└── README.md
```

## Autor

**Victor Bertolini** - [Perfil de GitHub](https://github.com/Bertolini-Victor)
