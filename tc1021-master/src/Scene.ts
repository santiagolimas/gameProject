import Engine from "./Engine"

abstract class Scene {
    public abstract render = () => {}
    public abstract update = () => {}
    public abstract enter = () => {}
    public abstract keyUpHandler = (event: KeyboardEvent) => {}
    public abstract keyDownHandler = (event: KeyboardEvent, engine: Engine) => {}

    public abstract mouseMoveHandler = (event: MouseEvent) => {}
    public abstract mouseUpHandler = (event: MouseEvent) => {}
    public abstract mouseDownHandler = (event: MouseEvent,engine: Engine) => {}
    
} 

export default Scene;