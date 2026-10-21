# Susu Viaja Conmigo

Aplicación de demostración para descubrir eventos y simular la compra de boletos. Está construida con React y Vite.

## Ejecutar localmente

Desde esta carpeta:

```sh
npm install
npm run dev
```

Para validar o previsualizar una compilación:

```sh
npm run lint
npm run build
npm run preview
```

## Publicar en GitHub Pages

El workflow `../.github/workflows/deploy-pages.yml` compila y publica el sitio automáticamente al hacer push a `main` o al ejecutarlo manualmente desde la pestaña **Actions** de GitHub.

En el repositorio, configura **Settings → Pages → Build and deployment → Source → GitHub Actions**. Después del primer despliegue, la aplicación estará en:

<https://luisle-png.github.io/losboletosinteligentes/>

La ruta base de Vite se ajusta automáticamente para GitHub Actions; en desarrollo local la app sigue usando `/`.

## Probar la compra

1. Busca eventos o filtra por categoría.
2. Abre un evento, selecciona la cantidad y continúa.
3. Crea un perfil de demostración con nombre y correo.
4. Consulta el comprobante desde el perfil.

Los perfiles, la sesión y los comprobantes se guardan en el almacenamiento local del navegador. No se solicitan contraseñas ni datos de pago. Los perfiles no son autenticación real y no deben usarse para proteger información.

**Todas las compras son simuladas:** no se realiza ningún cobro, no se reserva inventario compartido y los comprobantes no son válidos para entrar a eventos. Los eventos, fechas y precios son datos de ejemplo. Para vender boletos reales se necesita un backend con autenticación, inventario y un proveedor de pagos.
