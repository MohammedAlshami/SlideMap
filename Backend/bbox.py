import numpy as np

def split_bbox(bbox, n_splits):
    """
    Splits a bounding box into n_splits smaller bounding boxes.

    Args:
        bbox: A list of 4 numbers representing the bounding box in the format [x_min, y_min, x_max, y_max].
        n_splits: The number of splits to make.

    Returns:
        A list of n_splits lists of 4 numbers, each representing a smaller bounding box.
    """

    x_min, y_min, x_max, y_max = bbox
    w = x_max - x_min
    h = y_max - y_min

    split_width = w / n_splits
    split_height = h / n_splits

    smaller_bboxes = []
    for i in range(n_splits):
        for j in range(n_splits):
            x_min_new = x_min + i * split_width
            y_min_new = y_min + j * split_height
            x_max_new = x_min_new + split_width
            y_max_new = y_min_new + split_height
            smaller_bboxes.append([x_min_new, y_min_new, x_max_new, y_max_new])

    return smaller_bboxes

if __name__ == "__main__":
    bbox = [10, 20, 30, 40]
    n_splits = 2

    smaller_bboxes = split_bbox(bbox, n_splits)
    print(smaller_bboxes)
