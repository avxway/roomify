import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('visualizer/:id' , './routes/visualizer.$id.tsx'),
    route('showcase', './routes/showcase.tsx'),
    route('docs', './routes/docs.tsx'),
    route('shared/:username/:id', './routes/visualizer.$id.tsx')
] satisfies RouteConfig;
