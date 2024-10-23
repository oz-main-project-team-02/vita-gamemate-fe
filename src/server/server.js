import express from 'express';
import cors from 'cors';

import router from './payments.router'; // default export를 사용하는 경우

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/sandbox-dev/api/v1/payments', router);

app.listen(4242, () => console.log('Server is Listening... port:4242'));
