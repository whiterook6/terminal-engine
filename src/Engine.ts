import ansi from "ansi";
import { Framebuffer } from "./Framebuffer";

export type UpdateCallback = (deltaTimeMS: number) => void;
export type RenderCallback = (framebuffer: Framebuffer) => void;

export class Engine {
  public static tickLengthMs: number = 1000 / 60;
  private update?: UpdateCallback;
  private render?: RenderCallback;

  private isPaused: boolean = false;
  private intervalID?: NodeJS.Timeout;
  private cursor: ansi.Cursor;
  private framebuffer: Framebuffer;

  constructor() {
    this.cursor = ansi(process.stdout);
    this.cursor.hide();
    this.framebuffer = new Framebuffer(
      process.stdout.columns,
      process.stdout.rows,
    );

    process.on("SIGINT", () => {
      this.stop();
      this.cursor.goto(0, 0).show().reset().bg.reset().eraseLine();
      process.exit();
    });
  }

  public onUpdate = (update: UpdateCallback): Engine => {
    this.update = update;

    return this;
  };

  public onRender = (render: RenderCallback): Engine => {
    this.render = render;

    return this;
  };

  public start = (): Engine => {
    if (this.isPaused || !this.intervalID) {
      this.isPaused = false;
      this.intervalID = setInterval(this.gameLoop, Engine.tickLengthMs);
    }

    return this;
  };

  public stop = (): Engine => {
    this.isPaused = true;
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }

    return this;
  };

  public togglePause = (): Engine => {
    if (this.isPaused) {
      this.start();
    } else {
      this.stop();
    }

    return this;
  };

  public gameLoop = (): Engine => {
    if (!this.isPaused && this.update) {
      this.update(Engine.tickLengthMs);
    }

    if (this.render) {
      this.framebuffer.clear();
      this.render(this.framebuffer);
      this.framebuffer.render(this.cursor);
    }

    return this;
  };
}
