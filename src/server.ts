import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import cors from 'cors';
const address = 'http://localhost:3000';

const app = express();
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(3000, () => {
  console.log(`starting app on ${address}`);
});

export default app;