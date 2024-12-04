import {Router} from 'express';
import {StatusCodes} from "http-status-codes";

import {CidadesController} from './../controllers';



const router = Router();


router.get('/teste', (_req, res) => {
    res.send("Oláa");
});

router.post('/teste', (_req, res) => {
    console.log(_req.body);
    res.status(StatusCodes.ACCEPTED).json(_req.body);
});


export {router};