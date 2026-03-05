import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('visualizer/:id' , './routes/visualizer.$id.tsx', { id: 'visualizer' }),
    route('docs', './routes/docs.tsx'),
    route('showcase', './routes/showcase.tsx'),
    route('shared/:username/:id', './routes/visualizer.$id.tsx', { id: 'shared' })
] satisfies RouteConfig;
