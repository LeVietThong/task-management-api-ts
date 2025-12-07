import { Router, Request, Response } from "express";
import Task from "../../../models/task.model";
const router: Router = Router();



router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });

  res.json(tasks);
});

router.get("/detail/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const tasks = await Task.find({
    _id: id,
    deleted: false,
  });

  res.json(tasks);
});

export const taskRoutes: Router = router;
