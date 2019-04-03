Una vez clonado este proyecto, podrás ejecutarlo en un entorno de desarrollo o de producción.

1. Abrir consola de comandos en la carpeta donde se encuentra el proyecto y ejecutar `npm install`. Esto creará la carpeta
node_modules con los módulos de npm necesarios.
2. Tras la instalación, se puede ejecutar en entorno de desarrollo con el comando `npm start` o `yarn start`.
3. Nos aparecerá un mensaje que indica que la app se puede visitar en la dirección http://localhost:3000.
----------------------------------------------------------------------------------------------------------------------------

Para crear el entorno de producción, se deberá hacer lo siguiente:

1. Abrir la consola de comandos en la carpeta donde se encuentra el proyecto y ejecutar `npm run build` o `yarn build`.
Estos dos comandos crean la carpeta build con el proyecto para producción.
2. A contiuación podemos ejecutar `yarn global add serve` y cuando finalice, `serve -s build`. Estos dos comandos
lanzarán la app en el servidor y se podrá visitar en http://localhost:5000.
