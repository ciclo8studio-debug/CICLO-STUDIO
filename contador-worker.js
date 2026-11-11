// Contador del modo ahorro de energía - Cloudflare Worker + KV (plan gratuito)
// Guarda SOLO un número. No almacena IP, cookies ni datos personales.
// Pasos: Cloudflare > Workers & Pages > Create Worker > pega este código.
// Luego: Settings > Bindings > KV namespace > nombre de variable: ECO (crea un namespace nuevo).
// Copia la URL del Worker y pégala en ECO_API dentro de index.html.
const CORS = {
  'Access-Control-Allow-Origin': '*', // opcional: reemplaza * por la URL de tu sitio
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
    let n = parseInt((await env.ECO.get('count')) || '0', 10);
    if (req.method === 'POST') { n += 1; await env.ECO.put('count', String(n)); }
    return new Response(JSON.stringify({ count: n }), { headers: CORS });
  }
};
