import CommentModel from "../models/comment.model";
import { Comment } from "../type"

export const getAverageQualification = async (idMovie: string) : Promise<number> => {
    let average = 0;
    const comments = await CommentModel.find<Comment>({ idMovie: idMovie });
    
    if(!comments || comments.length == 0) return average;

    const total = comments.length;
    const sumQualification = comments.reduce((accumulator, object) => {
        return accumulator + object.qualification;
    }, 0);

    average = sumQualification / total

    return average
}