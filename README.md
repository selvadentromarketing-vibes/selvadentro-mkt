# Selvadentro MKT · Generador de Landing Pages

Herramienta interna de Selvadentro Tulum para generar landing pages a partir de
3 plantillas base y copy editable (manual o con IA). Sitio en producción:
`https://mkt.selvadentrotulum.com`.

## Stack

- Un solo archivo `index.html` (Vanilla JS + Google Fonts, sin build).
- Netlify Edge Function `netlify/edge-functions/auth.ts` para Basic Auth.
- `netlify.toml` con headers de seguridad y `X-Robots-Tag: noindex`.
- `robots.txt` bloquea a crawlers.

## Desarrollo local

```bash
# opción rápida — abre el archivo directamente
start index.html

# opción con auth simulado (Netlify Dev)
netlify dev
```

## Deploy

Push a `main` → Netlify hace deploy automático.

## Variables de entorno (Netlify → Site settings → Environment variables)

| Nombre            | Ejemplo         | Uso                                       |
| ----------------- | --------------- | ----------------------------------------- |
| `BASIC_AUTH_USER` | `selvadentro`   | Usuario del prompt de acceso              |
| `BASIC_AUTH_PASS` | `<contraseña>`  | Contraseña del prompt de acceso           |

Si alguna falta, el sitio queda abierto (útil para preview inicial).
