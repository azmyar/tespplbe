import app from './index';

const PORT: string = process.env.PORT!;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});