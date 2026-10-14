# Cabeceras de seguridad. En nginx, un add_header dentro de un location REEMPLAZA a los del server
# (no se suman): por eso este archivo se incluye en el server y otra vez en cada location que define
# su propio add_header (cache). Si se agrega una cabecera, va acá y llega a todos lados.
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
