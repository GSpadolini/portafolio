import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRoutes from './routes/views.routes.js';
import registroRoutes from './routes/registro.routes.js';
import contacRoutes from './routes/contacto.routes.js';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import projectsRoutes from './routes/twitter.routes.js';
import buscarRoutes from './routes/twitter.buscar.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("port", 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/uploads'));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
// los datos de sesion serán accesibles en cualquier plantilla 
app.use((req, res, next) => {
  res.locals.idUser = req.session.idUser;
  res.locals.userName = req.session.userName;
  res.locals.userEmail = req.session.userEmail;
  next();
});

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(viewsRoutes);
app.use(registroRoutes);
app.use(contacRoutes);
app.use(projectsRoutes);
app.use(buscarRoutes);
app.use(fileUpload({ createParentPath: true }));
app.use((req, res) => {
  res.status(404).render('404');
});



export default app;