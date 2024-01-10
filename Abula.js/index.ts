import { Hono } from 'hono';

export type Abula = Hono & {
    abula: boolean,
    gets: (path: string[], ...handler: any[]) => Abula,
    posts: (path: string[], ...handler: any[]) => Abula,
    puts: (path: string[], ...handler: any[]) => Abula,
    deletes: (path: string[], ...handler: any[]) => Abula,
};

export function createAbula(base: Hono): Abula {
    // @ts-ignore
    const app: Abula = Object.create(base);
    app.abula = true;
    app.gets = (path: string[], ...handler: any[]) => {
        for (const p in path) {
            app.get(p, ...handler)
        }

        return app;
    }
    app.posts = (path: string[], ...handler: any[]) => {
        for (const p in path) {
            app.post(p, ...handler)
        }

        return app;
    }
    app.puts = (path: string[], ...handler: any[]) => {
        for (const p in path) {
            app.put(p, ...handler)
        }

        return app;
    }
    app.deletes = (path: string[], ...handler: any[]) => {
        for (const p in path) {
            app.delete(p, ...handler)
        }

        return app;
    }

    return app;
}