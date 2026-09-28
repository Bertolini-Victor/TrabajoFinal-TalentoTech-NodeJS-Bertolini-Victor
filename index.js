const API_URL = "https://fakestoreapi.com";

const [method, fullResource, ...restArgs] = process.argv.slice(2);
const [resource, id] = fullResource ? fullResource.split("/") : [];

async function request(path, options) {
	const response = await fetch(`${API_URL}${path}`, options);

	if (!response.ok) {
		throw new Error(`Error en la petición: ${response.status}`);
	}

	const text = await response.text();
	return text ? JSON.parse(text) : null;
}

function isValidId(value) {
	return Number.isInteger(Number(value)) && Number(value) > 0;
}

function showHelp() {
	console.log("Comando no reconocido o incompleto. Uso:");
	console.log("  npm run start GET products");
	console.log("  npm run start GET products/<productId>");
	console.log("  npm run start POST products <title> <price> <category>");
	console.log("  npm run start DELETE products/<productId>");
}

async function getProducts(productId) {
	try {
		if (productId && !isValidId(productId)) {
			console.log(`Error: "${productId}" no es un ID válido.`);
			return;
		}

		const data = await request(
			productId ? `/products/${productId}` : "/products",
		);

		if (!data) {
			console.log(`No se encontró ningún producto con el ID: ${productId}`);
			return;
		}

		console.log(
			productId
				? `--- Producto ${productId} ---`
				: "--- Lista de Productos ---",
		);
		console.log(data);
	} catch (error) {
		console.error("Hubo un problema al obtener los datos:", error.message);
	}
}

async function createProduct([title, price, category]) {
	try {
		if (!title || !price || !category) {
			console.log("Error: Faltan argumentos.");
			console.log(
				"Ejemplo: npm run start POST products T-Shirt-Rex 300 remeras",
			);
			return;
		}

		const numericPrice = Number(price);
		if (Number.isNaN(numericPrice)) {
			console.log(`Error: el precio "${price}" no es un número válido.`);
			return;
		}

		const newProduct = { title, price: numericPrice, category };

		const data = await request("/products", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newProduct),
		});

		console.log("Producto creado con éxito:");
		console.log(data);
	} catch (error) {
		console.error("Hubo un problema al crear el producto:", error.message);
	}
}

async function deleteProduct(productId) {
	try {
		if (!isValidId(productId)) {
			console.log("Error: Debes proporcionar un ID de producto válido.");
			console.log("Ejemplo: npm run start DELETE products/7");
			return;
		}

		const data = await request(`/products/${productId}`, { method: "DELETE" });

		if (!data) {
			console.log(
				`No se encontró ningún producto con el ID: ${productId} para eliminar.`,
			);
			return;
		}

		console.log(`Producto ${productId} eliminado con éxito.`);
		console.log(data);
	} catch (error) {
		console.error("Hubo un problema al eliminar el producto:", error.message);
	}
}

if (resource !== "products") {
	showHelp();
} else {
	switch (method?.toUpperCase()) {
		case "GET":
			await getProducts(id);
			break;
		case "POST":
			await createProduct(restArgs);
			break;
		case "DELETE":
			await deleteProduct(id);
			break;
		default:
			showHelp();
	}
}
