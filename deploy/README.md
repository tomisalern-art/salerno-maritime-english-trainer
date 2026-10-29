# Publicación V18.9.9

Ejecutar `node deploy/build.mjs`. Netlify publica la carpeta `dist`.

El HTML y los recursos conservan exactamente los bytes del ZIP entregado. Los recursos de la publicación anterior también se conservan.

El PDF `assets/c4f588e1c71cd65cac3d.pdf` supera el límite de transferencia de la conexión utilizada para subir archivos. Sus dos fragmentos binarios se guardan en `deploy/parts/`; el build los concatena, comprueba el tamaño y SHA-256 originales y publica el PDF completo en su ruta original. No se transforma el PDF ni se alteran sus páginas.

`manifest.json` enumera los archivos publicados y sus comprobaciones de integridad. Si se actualiza contenido en el futuro, deben actualizarse sus entradas; cualquier discrepancia detiene el build. Los fragmentos, el manifest y este script no se publican.
