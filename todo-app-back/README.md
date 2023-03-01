# ToDo App Backend:

Para este servidor tenemos 3 tipos de rutas:

1-Login y Registro.
2-Referente a las tasks.
3-Informacion del usuario.

Toda esta informacion esta resguardada por un middleware que se encarga de validad el token recibido por cabecera y cada uno de los metodos tiene un control de errores que se adapta a los requeremientos de cada una.

## Login y Registro:
Raiz:/login
#### Metodos GET:
    / :La manera de acceder a la ruta es get / y los parametros que recibe son: header:{userName,password}.
    /register:La manera de acceder a la ruta es  post /register y los parametros que recibe son: header:{userName,password}.


## Tasks: //todas requieren en token en header
raiz: /tasks
#### Metodos GET:
    / : Solo requiere el token en header y obtiene todas las tasks
    /metrics: Solo requiere el token en header y obtiene las tasks de la semana en curso.
#### Metodo POST: 
    /create: {name,description,time}=>body 
    /edit: {taskId,props}=>body //// props es un objeto que contiene los cambios {name,description,time,etc} cualquier campo del modelo.
    /random: Solo el token por header 
#### Metodos DELETE:
    /delete: {taskId}=>body;


## User:
Raiz /user.

#### Metodos GET:
    /: getUserInfo solo recibe el token de inicio de sesion en header como token.

# NOTA:
    Cuando el middleware detecta que el token esta vencido o es falso respondera con un status false y un mensaje de error referente a ello:
        caso token vencido: {status:false,message:'Autorización expirada'}
        caso token errado: {status:false,message:'Autorizacion invalidad'}