import { router } from "../trpc";
import { authRouter } from "./auth";
import { productRouter } from "./product";
import { orderRouter } from "./orders";

export const appRouter = router({
  product: productRouter,
  order: orderRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
