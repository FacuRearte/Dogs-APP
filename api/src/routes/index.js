const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoute = require( './dogs' );
const temperamentRoute = require( './temperaments' );


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoute )
router.use('/temperaments', temperamentRoute )

module.exports = router;
