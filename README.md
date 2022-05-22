# E-Cademy
Repositorio para el trabajo final de DyGRS (Despliegue y Gestión de Redes y Servicios), asignatura de la especialidad de Telemática del cuarto curso del Grado en Ingeniería en Tecnología de Telecomunicación de la UPV/EHU.

# Instalación

1. Descargar Docker y Docker-compose
2. Clonar el repositorio:  ` git clone https://github.com/portega017/E-Cademy.git `
3. Vamos a la carpeta clonada ` cd E-Cademy ` y ejecutamos el script de instalación: ` ./install_ecademy.sh `
4. Para cargar la base de datos ejecutamos los siguientes comandos: ` docker exec -it e-cademy_mysqldb_1 mysql -p ` e introducimos la contraseña del root de la base de datos (la podemos encontrar en el fichero docker-compose.yml)
5. Finalmente cargamos el fichero en la base de datos mediante el comando: ` \. academia.sql `
