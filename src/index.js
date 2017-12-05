const eps = 1e-6;

function checkPoint([x1, y1], [x2, y2], [x, y]) {
    if (Math.abs(x1 - x) < eps && Math.abs(y1 - y) < eps) {
        return true;
    }
    if (Math.abs(x2 - x) < eps && Math.abs(y2 - y) < eps) {
        return true;
    }
    //(x-x1)/(x2-x1)=(y-y1)/(y2-y1)
    let left, right;
    if (Math.abs(x2 - x1) <= eps) {
        left = 0;
    } else {
        left = (x - x1) / (x2 - x1);
    }

    if (Math.abs(y2 - y1) <= eps) {
        right = 0;
    } else {
        right = (y - y1) / (y2 - y1);
    }
    return Math.abs(left - right) <= eps;
}

module.exports = function isPointsOnLine(points) {
    let min, max;
    points.map(([x, y]) => {
        if (!min) {
            min = [x, y];
        }
        if (!max) {
            max = [x, y];
        }

        if (min[0] > x) {
            min = [x, y]
        } else if (Math.abs(min[0] - x) <= eps && min[1] > y) {
            min = [x, y]
        }

        if (max[0] < x) {
            max = [x, y]
        } else if (Math.abs(max[0] - x) <= eps && max[1] < y) {
            max = [x, y]
        }
    });

    return points.reduce((result, point) => {
        return result && checkPoint(min, max, point);
    }, true);
};
