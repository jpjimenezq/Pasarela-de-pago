import { POST, POST } from "./src/app/api/checkout/route";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const response = await POST();
            res.status(200).json(response);
        } catch (error) {
            console.error('Error en la solicitud: ', error);
            res.status(500).json({ error: 'Hubo un problema al procesar la solicitud'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end("Método no permitido");
    }
}
