import { Request, Response, NextFunction } from "express";
import {WorkoutService} from "../services/workout-service";

export class WorkoutController {
    static async list(req: Request, res: Response, next: NextFunction){
        try{
            const result = await WorkoutService.getWorkoutList();
            res.status(200).json({data: result});
        } catch (e){
            next(e);
        }
    }

    static async add(req: Request, res: Response, next: NextFunction){
        try{
            const userId = (req as any).user.id;
            const result = await WorkoutService.addHistory(userId, req.body);
            res.status(200).json({data: result, message: "Workout saved"});
        } catch (e){
            next(e);
        }
    }

    static async history(req: Request, res: Response, next: NextFunction){
        try{
            const userId = (req as any). user.id;
            const result = await WorkoutService.getMyHistory(userId);
            res.status(200).json({data: result});
        } catch (e){
            next(e);
        }
    }
}