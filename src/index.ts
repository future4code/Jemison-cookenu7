import app from "./controller/app"
import { postRouter } from './router/postRouter';
import { userRouter } from "./router/userRouter"


app.use('/user/', userRouter)
app.use('/post/', postRouter)
