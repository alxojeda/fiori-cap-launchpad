## App Fiori con backend CAP

### Descripción
Aplicación fiori para desplegar en servicio Fiori Launchpad de BTP con backend CAP  
La aplicación frontend se comunica con el backend a través de un destination, el backend solo puede ser consumido si el usuario ya inicio sesión, por lo que ambas usan una instancia del servicio xsuaa.  
La sesión es controlada por el servicio Launchpad

### Pruebas locales
- Realizar la configuración del xsuaa [(configuración xsuaa)](#configuración-de-xsuaa)
- Generar key y copiar los valores dentro del nodo credentials del archivo default-env.json
```
cd api
npm install
cds watch

cd app
npm install
npm run build:uilocal

cd approuter
npm install
npm run start
```

### Deploy hacia BTP
- Realizar la configuración del xsuaa [(configuración xsuaa)](#configuración-de-xsuaa)
```
cd api
npm install
mbt build
cf deploy mta_archives/*.mtar
```

- Crear destination

|*Dato*|*Valor*|
|---|---|
|Name|cds_api|
|Type|HTTP|
|Description||
|URL|_Ruta del servicio_|
|Proxy Type|Internet|
|Authentication|NoAuthentication|

Additional Properties
|*Dato*|*Valor*|
|---|---|
|HTML5.ForwardAuthToken|true|
```
cd app
npm install
mbt build
cf deploy mta_archives/*.mtar
```
- Agregar aplicación a site en Launchpad

### Configuración de xsuaa
- Crear instancia de servicio xsuaa en BTP
```
cf create-service xsuaa application fiori_cap-xsuaa -c xs-security.json
```

### Enlaces
[Crear service key](https://help.sap.com/docs/CREDENTIAL_STORE/601525c6e5604e4192451d5e7328fa3c/7502e1780e5b46f7982f8cc2a37a0080.html?locale=en-US)  
[Creación de Sites en Launchpad](https://developers.sap.com/group.launchpad-cf-create-site.html)  
[Probar servicios CAP con postman y XSUAA](https://blogs.sap.com/2020/03/02/using-postman-for-api-testing-with-xsuaa/)  