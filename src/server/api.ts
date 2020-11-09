import express, { Router , Request, Response } from "express";


const router: Router = express.Router();

router.get("/test", (_req: Request, res: Response) => {
  res.send({ status: "success ok" });
});

export default router;
