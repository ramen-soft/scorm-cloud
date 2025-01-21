const isValidNIF = (nif: string): boolean => {
	const nifRegex = /^(?:[XYZ]\d{7}|\d{8})[A-Z]$/i; // Regex para NIF y NIE
	if (!nifRegex.test(nif)) return false;

	const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

	// Convertir el número, ajustando para NIE si aplica
	const numero = parseInt(
		nif
			.slice(0, -1) // Todo excepto la última letra
			.replace(/^[XYZ]/, (char) =>
				char === "X" ? "0" : char === "Y" ? "1" : "2"
			),
		10 // Base decimal
	);

	// Calcular la letra esperada
	const letraEsperada = letras[numero % 23];

	// Extraer la letra proporcionada en el NIF
	const letra = nif.slice(-1).toUpperCase();

	// Comparar la letra calculada con la proporcionada
	return letra === letraEsperada;
};

const isValidCIF = (cif: string): boolean => {
	const cifRegex = /^[ABCDEFGHJNPQRSUVW]\d{7}[A-J0-9]$/i; // Regex para formato básico
	if (!cifRegex.test(cif)) return false;

	const controlDigit = cif.slice(-1).toUpperCase(); // Último carácter (dígito de control)
	const digits = cif.slice(1, -1).split("").map(Number); // Dígitos numéricos (sin la letra inicial y el dígito de control)

	// Suma de las posiciones pares
	const evenSum = digits
		.filter((_, i) => i % 2 !== 0) // Posiciones pares
		.reduce((a, b) => a + b, 0);

	// Suma de las posiciones impares
	const oddSum = digits
		.filter((_, i) => i % 2 === 0) // Posiciones impares
		.map((n) => n * 2) // Multiplicar por 2
		.map((n) => (n > 9 ? n - 9 : n)) // Sumar los dígitos si el resultado es mayor que 9
		.reduce((a, b) => a + b, 0);

	// Suma total
	const totalSum = evenSum + oddSum;

	// Complemento a 10 del último dígito
	const calculatedControl = (10 - (totalSum % 10)) % 10;

	// Validación según el tipo de CIF
	const firstLetter = cif[0].toUpperCase();
	if ("NPQRSW".includes(firstLetter)) {
		// Si el dígito de control debe ser una letra
		return controlDigit === "JABCDEFGHI"[calculatedControl];
	} else {
		// Si el dígito de control puede ser un número o una letra
		return (
			parseInt(controlDigit) === calculatedControl || // Número
			controlDigit === "JABCDEFGHI"[calculatedControl] // Letra
		);
	}
};

export { isValidNIF, isValidCIF };
