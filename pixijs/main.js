import { Application, Graphics } from 'pixi.js';

const app = new Application();

await app.init({
  width: 800,
  height: 600,
  background: '#1e1e1e',
});

document.body.appendChild(app.canvas);

// Прямоугольник
const rect = new Graphics()
  .rect(-75, -50, 150, 100) // рисуем относительно центра
  .fill(0x4fc3f7);

rect.x = app.screen.width / 2;
rect.y = app.screen.height / 2;

app.stage.addChild(rect);

// Анимация вращения
app.ticker.add((time) => {
  rect.rotation += 0.02 * time.deltaTime;
});