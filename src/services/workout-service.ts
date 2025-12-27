import {prismaClient} from "../utils/database-util";
import { ResponseError } from "../error/response-error";

interface AddWorkoutRequest{
    workoutListId: number;
    duration: number;
    reps: number;
    date?: string;
}

export class WorkoutService{
    static async getWorkoutList(){
        return await prismaClient.workoutList.findMany({
            orderBy: {workout_name: "asc"},
        });
    }

    static async addHistory(userId: number, request: AddWorkoutRequest){
        if (!request.workoutListId || !request.duration){
            throw new ResponseError(400, "Workout ID and Duration are required");
        }
        const workoutRef = await prismaClient.workoutList.findUnique({
            where: {id: request.workoutListId},
        });
        if (!workoutRef) throw new ResponseError(404, "Workout type not found");
        const totalCalories = request.duration * workoutRef.calories_per_minute;

        const newHistory = await prismaClient.historyWorkouts.create({
            data:{
                user_id: userId,
                workout_list_id: request.workoutListId,
                duration: request.duration,
                reps: request.reps,
                calories_total_burn: totalCalories,
                time_stamp: request.date ? new Date(request.date) : new Date(),
            },
        });

        await prismaClient.user.update({
            where: {id: userId},
            data: {
                total_calories_burn: {increment: totalCalories},
            },
        });

        return newHistory;
    }

    static async getMyHistory(userId: number){
        const history = await prismaClient.historyWorkouts.findMany({
            where: {user_id: userId},
            include:{
                workout: true,
            },
            orderBy: {time_stamp: "desc"},
        });
        return history.map((item) => ({
            id: item.id,
            workoutName: item.workout.workout_name,
            duration: item.duration,
            reps: item.reps,
            calories: item.calories_total_burn,
            timeStamp: item.time_stamp,
        }));
    }
}