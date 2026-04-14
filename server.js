import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let visitors = [];

app.post('/api/notify', (req, res) => {
  const visitor = {
    ...req.body,
    id: Date.now(),
    visitedAt: new Date().toISOString(),
  };
  visitors.push(visitor);
  console.log('New visitor:', visitor.page, visitor.url);
  res.json({ message: 'Visitor recorded', success: true });
});

app.get('/api/visitors/count', (req, res) => {
  const uniqueVisitors = new Set(visitors.map(v => v.url));
  res.json({ count: uniqueVisitors.size || visitors.length });
});

app.get('/api/visitors', (req, res) => {
  res.json({ visitors });
});

app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});