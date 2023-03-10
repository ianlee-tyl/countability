import type {HydratedDocument} from 'mongoose';
import type {Point} from './model';

type PointResponse = {
  _id: string;
  username: string;
  point: number;
};

/**
 * Transform a raw Point object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Point>} point - A point
 * @returns {PointResponse} - The post object formatted for the frontend
 */
const constructPointResponse = (point: HydratedDocument<Point>): PointResponse => {
  const pointCopy: Point = {
    ...point.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    _id: pointCopy._id.toString(),
    point: pointCopy.point,
    username: pointCopy.username
  };
};

export {
  constructPointResponse
};
